## **1. Enable Dynamic Swap Memory Allocation**
Linux does not natively support **dynamic swap space expansion**, but you can achieve it with **zram** (compressed RAM-based swap) or **swapfile auto-resizing**.

### **A. Use `zram` for Compressed Swap (Recommended)**
Instead of disk-based swap, `zram` creates a compressed swap space in RAM, reducing disk I/O and improving performance.

#### **Install & Enable `zram`**
```bash
sudo apt install zram-tools -y  # Ubuntu/Debian
sudo dnf install zram-generator -y  # Fedora
sudo pacman -S zram-generator --noconfirm  # Arch
```

#### **Configure `zram`**
Create a systemd configuration file:
```bash
sudo nano /etc/systemd/zram-generator.conf
```
Add the following:
```ini
[zram0]
zram-size = ram / 2   # 50% of RAM as swap
compression-algorithm = zstd
swap-priority = 100
```
Enable and start `zram`:
```bash
sudo systemctl enable --now systemd-zram-setup@zram0
```

---

### **B. Auto-Resizing Swap File (Alternative)**
If you want **disk-based swap that expands on demand**, use a script to dynamically resize the swapfile.

#### **Create a Dynamic Swap Script**
```bash
sudo nano /etc/systemd/system/dynamic-swap.service
```
Add the following:
```ini
[Unit]
Description=Dynamic Swap Space Manager
After=local-fs.target

[Service]
ExecStart=/usr/local/bin/dynamic-swap.sh
Restart=always
Type=simple

[Install]
WantedBy=multi-user.target
```

#### **Create the Script**
```bash
sudo nano /usr/local/bin/dynamic-swap.sh
```
Add:
```bash
#!/bin/bash
SWAPFILE=/swapfile
MINSWAP=2G  # Minimum Swap
MAXSWAP=16G  # Maximum Swap
USAGE_THRESHOLD=70  # Expand when RAM usage > 70%

while true; do
    TOTAL_RAM=$(free -m | awk '/Mem:/ {print $2}')
    USED_RAM=$(free -m | awk '/Mem:/ {print $3}')
    SWAP_USED=$(free -m | awk '/Swap:/ {print $3}')
    
    if (( USED_RAM * 100 / TOTAL_RAM > USAGE_THRESHOLD )); then
        NEW_SIZE=$(( $(stat -c %s $SWAPFILE 2>/dev/null || echo 0) + 1024 * 1024 * 1024 ))
        if (( NEW_SIZE <= MAXSWAP * 1024 * 1024 * 1024 )); then
            echo "Increasing swap size..."
            sudo swapoff $SWAPFILE
            sudo dd if=/dev/zero of=$SWAPFILE bs=1M count=$((NEW_SIZE / 1024 / 1024))
            sudo chmod 600 $SWAPFILE
            sudo mkswap $SWAPFILE
            sudo swapon $SWAPFILE
        fi
    fi

    sleep 10  # Check every 10 seconds
done
```

Make it executable:
```bash
sudo chmod +x /usr/local/bin/dynamic-swap.sh
sudo systemctl enable --now dynamic-swap.service
```

---

## **2. Move Inactive Applications to Swap (Like macOS)**
By default, Linux prefers RAM over swap. To make it behave like macOS:
- **Increase `swappiness`** (moves inactive apps to swap)
- **Use `systemd-oomd` for memory management**

### **Set Swappiness**
Increase `swappiness` so that background apps move to swap:
```bash
sudo sysctl -w vm.swappiness=80
echo "vm.swappiness=80" | sudo tee -a /etc/sysctl.conf
```

### **Enable `systemd-oomd` (Out-of-Memory Daemon)**
This automatically swaps out inactive processes.
```bash
sudo systemctl enable --now systemd-oomd
```

---

## **3. Optimize RAM Usage with Cgroups**
If you are running multiple applications (e.g., Docker, Kubernetes, etc.), use **cgroups** to manage memory limits.

### **Limit RAM Usage per Application**
For example, to limit a process to **2GB RAM + Swap**:
```bash
mkdir -p /sys/fs/cgroup/memory/myapp
echo $YOUR_PROCESS_PID > /sys/fs/cgroup/memory/myapp/cgroup.procs
echo $((2 * 1024 * 1024 * 1024)) > /sys/fs/cgroup/memory/myapp/memory.limit_in_bytes
```

For Kubernetes worker nodes, define memory limits in `kubelet`:
```yaml
resources:
  limits:
    memory: "4Gi"
  requests:
    memory: "2Gi"
```

---

## **4. Enable Transparent HugePages (THP) for Memory Optimization**
THP improves performance by reducing fragmentation.
```bash
echo always | sudo tee /sys/kernel/mm/transparent_hugepage/enabled
```

---

## **5. Enable Kernel Task Scheduler Like macOS**
Linux kernel does not use **pressure-based scheduling** like macOS, but you can improve it using **BFQ I/O Scheduler**.

### **Enable BFQ Scheduler**
```bash
echo bfq | sudo tee /sys/block/sda/queue/scheduler
```

---

## **6. Enable ZSWAP for Better Performance**
Zswap is a compressed RAM swap cache that helps avoid disk swap.
```bash
echo Y | sudo tee /sys/module/zswap/parameters/enabled
echo zstd | sudo tee /sys/module/zswap/parameters/compressor
```

---

## **7. Finalizing the Setup**
After making all changes, **reboot your system**:
```bash
sudo reboot
```

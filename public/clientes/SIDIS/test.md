graph TD
    subgraph GCP["Google Cloud Platform (GCP)"]
        
        subgraph GKE["GKE Cluster (Producción)"]
            
            subgraph NS["Namespace: mongodb"]
                
                Operator[("K8s Operator<br/>(Controller)")]:::mongo
                OpsMgr[("Ops Manager<br/>(Monitoring & Backup)")]:::mongo
                CertMgr[("Cert-Manager<br/>(Auto TLS/SSL)")]:::k8s
                
                subgraph StatefulSet["StatefulSet: MongoDB Replica Set"]
                    P1[("Mongo Pod 0<br/>(Primary)")]:::db
                    P2[("Mongo Pod 1<br/>(Secondary)")]:::db
                    P3[("Mongo Pod 2<br/>(Secondary)")]:::db
                end
            end
            
            APP[("Microservicios / Apps")]:::app
        end

        %% Persistencia (La clave del éxito)
        subgraph PD["Google Persistent Disks (Zonal)"]
            D1[("Disk 0 (pd-ssd)<br/>Retain Policy")]:::disk
            D2[("Disk 1 (pd-ssd)<br/>Retain Policy")]:::disk
            D3[("Disk 2 (pd-ssd)<br/>Retain Policy")]:::disk
        end

        %% Backups
        subgraph GCS["Google Cloud Storage"]
            Bucket[("GCS Bucket<br/>(S3 Interop)")]:::backup
        end
    end

    %% Relaciones
    Operator -.->|Gestiona Config & Estado| P1
    Operator -.->|Gestiona Config & Estado| P2
    Operator -.->|Gestiona Config & Estado| P3
    
    APP ==>|Lee/Escribe TLS| P1
    
    P1 --- D1
    P2 --- D2
    P3 --- D3
    
    OpsMgr -->|Snapshot Backup S3 API| Bucket
    P1 -.->|Envía Métricas & Logs| OpsMgr
    CertMgr -.->|Inyecta Certificados| P1
    
    %% Estilos
    style GCP fill:#f5f5f5,stroke:#333,stroke-dasharray: 5 5
    style GKE fill:#e8f0fe,stroke:#4285f4,stroke-width:2px
    style NS fill:#ffffff,stroke:#333
    style PD fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style GCS fill:#e0f2f1,stroke:#009688,stroke-width:2px
    
    classDef mongo fill:#13aa52,stroke:#fff,stroke-width:2px,color:#fff
    classDef db fill:#00ed64,stroke:#333,stroke-width:1px,color:#333
    classDef k8s fill:#326ce5,stroke:#fff,stroke-width:2px,color:#fff
    classDef app fill:#666,stroke:#fff,stroke-width:1px,color:#fff
    classDef disk fill:#ff9800,stroke:#333,stroke-width:1px,color:#000
    classDef backup fill:#00bcd4,stroke:#333,stroke-width:1px,color:#fff
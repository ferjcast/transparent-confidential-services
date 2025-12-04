resource "google_compute_instance" "confidential_instance" {
  name         = var.instance_name
  zone         = var.zone
  machine_type = "c3-standard-4"
  min_cpu_platform = "Intel Sapphire Rapids"

  boot_disk {
    auto_delete = true
    device_name = var.boot_disk_name
    initialize_params {
      image = "${var.image_project}/${var.image}"
      size    = 30
      type    = "pd-balanced"
    }

    mode = "READ_WRITE"
  }

  network_interface {
    network       = var.network
    access_config {
      // Ephemeral public IP
    }
  }

   confidential_instance_config {
    confidential_instance_type = "TDX"
  }

  scheduling {
    on_host_maintenance = "TERMINATE"
    preemptible         = false
    provisioning_model  = "STANDARD"
    automatic_restart = true
  }

   shielded_instance_config {
    enable_integrity_monitoring = true
    enable_secure_boot          = true
    enable_vtpm                 = true
  }

  service_account {
    scopes = ["https://www.googleapis.com/auth/cloud-platform"]
  }

  metadata = var.startup_script != null ? {
    startup-script = file(var.startup_script)
  } : {}

  tags = var.tags
}

resource "google_compute_firewall" "allow-attestation" {
  name    = var.name
  network = var.network

  direction     = "INGRESS"
  priority      = 1000
  target_tags   = var.target_tags
  source_ranges = ["0.0.0.0/0"]
  disabled      = false

  allow {
    protocol = "tcp"
    ports    = ["8080"]
  }
}

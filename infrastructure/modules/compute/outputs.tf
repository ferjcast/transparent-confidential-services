output "confidential_instance_ip" {
  description = "Public IP of the confidential VM instance"
  value       = google_compute_instance.confidential_instance.network_interface[0].access_config[0].nat_ip
}

output "confidential_instance_name" {
  description = "Name of the confidential VM instance"
  value       = google_compute_instance.confidential_instance.name
  
}

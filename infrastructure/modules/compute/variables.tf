variable "instance_name" {
  description = "Name of the VM"
  type        = string
  default     = "reference-tee"
}

variable "boot_disk_name" {
  description = "Name of the boot disk"
  type        = string
  default     = "reference-tee"
}

variable "image" {
  description = "Image to use for the VM"
  type        = string
}

variable "image_project" {
  description = "Project containing the image"
  type        = string
}

variable "zone" {
  description = "Zone to deploy the VM"
  type        = string
}

variable "network" {
  description = "Name of the VPC network to attach to"
  type        = string
}

variable "tags" {
  description = "Network tags for firewall rules"
  type        = list(string)
  default     = []
}

variable "startup_script" {
  description = "Path to a startup script to inject via metadata"
  type        = string
  default     = null
}

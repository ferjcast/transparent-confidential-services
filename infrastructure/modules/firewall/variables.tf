variable "name" {
  description = "Name of the firewall rule"
  type        = string
}

variable "network" {
  description = "Name of the VPC network to attach to"
  type        = string
}

variable "target_tags"   {
  type = list(string)
}



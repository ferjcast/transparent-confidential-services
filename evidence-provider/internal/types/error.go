package types

// ### Response Types ###

type ErrorResponse struct {
	Status  string      `json:"Status"`
	Message interface{} `json:"Message"`
}

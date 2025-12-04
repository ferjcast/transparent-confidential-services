package types

type ErrorResponse struct {
	Status  string      `json:"Status"`
	Message interface{} `json:"Message"`
}

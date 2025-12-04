package metrics

import "github.com/prometheus/client_golang/prometheus"

// ReqDuration collects handler-level latency in seconds.
var ReqDuration = prometheus.NewHistogramVec(
	prometheus.HistogramOpts{
		Namespace: "ev",
		Subsystem: "http",
		Name:      "handler_seconds",
		Help:      "Latency HTTP handlers of Evidence Verifier.",
		Buckets:   prometheus.DefBuckets,
	},
	[]string{"route"},
)

// MustRegister wires the metric into the default registry.
func MustRegister() {
	prometheus.MustRegister(ReqDuration)
}

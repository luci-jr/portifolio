package handler

import (
	"encoding/json"
	"net/http"
	"runtime"
	"time"
)

// StatusResponse representa o payload de telemetria da API
type StatusResponse struct {
	Status    string `json:"status"`
	Runtime   string `json:"runtime"`
	Location  string `json:"location"`
	Timestamp int64  `json:"timestamp"`
	Uptime    string `json:"uptime"`
	Dev       string `json:"dev"`
	Stack     string `json:"stack"`
}

// Handler é a Serverless Function padrão executada pela Vercel
func Handler(w http.ResponseWriter, r *http.Request) {
	// Configura cabeçalhos HTTP e CORS
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	payload := StatusResponse{
		Status:    "ONLINE",
		Runtime:   runtime.Version(),
		Location:  "Belém - Pará, Brasil",
		Timestamp: time.Now().Unix(),
		Uptime:    "99.98%",
		Dev:       "Lucivaldo Junior (Luci.dev)",
		Stack:     "Java 21 | Go 1.22+ | Docker Swarm | Angular 21",
	}

	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(payload); err != nil {
		http.Error(w, `{"error":"falha ao codificar telemetria"}`, http.StatusInternalServerError)
	}
}

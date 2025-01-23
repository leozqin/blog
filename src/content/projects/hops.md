---
name: hops (Heterogeneous Ollama Proxy Server)
order: 3
link: https://github.com/leozqin/hops
blogLink: /posts/hops-my-final-llm-project
tech:
- python
- fastapi
- ollama
- llm
---
A load-balancing reverse proxy server that enables you to address a fleet of diverse/heterogeneous Ollama instances as a single one. Scale inference throughput by using any cheap consumer-grade hardware, and you don't need to route inferences to different fleets based on their model needs nor acquire numerous of the same expensive GPUs. Simply provision your Ollama instances with models that they can safely run, and HOPS will do the rest!
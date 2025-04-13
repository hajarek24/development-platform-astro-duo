package com.backend.space_gateway.service;

import com.backend.space_gateway.model.ApodResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ApodService {

    private final WebClient webClient;
    private final String apiKey;

    public ApodService(WebClient webClient, @Value("${nasa.api.key}") String apiKey) {
        this.webClient = webClient;
        this.apiKey = apiKey;
    }

    public Mono<ApodResponse> getAstronomyPictureOfDay() {
        return webClient.get()
                .uri("https://api.nasa.gov/planetary/apod?api_key=" + apiKey)
                .retrieve()
                .bodyToMono(ApodResponse.class);
    }
}
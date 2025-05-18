package com.backend.space_gateway.service;

import com.backend.space_gateway.model.ImageLibraryResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ImageLibraryService {

    private final WebClient webClient;

    public ImageLibraryService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<ImageLibraryResponse> searchImages(String query, int page, int pageSize) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("images-api.nasa.gov")
                        .path("/search")
                        .queryParam("q", query)
                        .queryParam("media_type", "image")
                        .queryParam("page", page)
                        .queryParam("page_size", pageSize)
                        .build())
                .retrieve()
                .bodyToMono(ImageLibraryResponse.class);
    }

    // public Mono<ImageLibraryResponse> getLatestArticles(int count) {
    //     // For articles, we search for "news" content
    //     return searchImages("space news", 1, count);
    // }
}
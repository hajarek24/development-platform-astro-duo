package com.backend.space_gateway.service;

import com.backend.space_gateway.model.ArticlesResponse;
import com.backend.space_gateway.model.SpaceflightNewsArticle;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpMethod;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class ArticlesService {

    @Value("${newsapi.key}")
    private String apiKey;
    private static final String API_URL = "https://newsapi.org/v2/everything?q=space+AND+(astronomy+OR+NASA+OR+rocket+OR+planet)&language=en&pageSize=100&sortBy=publishedAt&apiKey=%s";
    private static final List<String> STRONG_SPACE_KEYWORDS = Arrays.asList(
            "space", "nasa", "astronomy", "rocket", "satellite", "planet", "galaxy", "cosmos", "universe",
            "mars", "moon", "asteroid", "comet", "star", "spacex", "iss", "hubble", "telescope", "apollo", "voyager"
    );

    private static final List<String> EXCLUDE_KEYWORDS = Arrays.asList(
            "tv", "show", "series", "movie", "film", "music", "album", "song", "concert", "band", "review", "buy", "best", "kids", "child", "children", "fashion", "phone", "smartphone",
            "tablet", "laptop", "game", "gaming", "moontype", "celebrity", "actor", "actress", "theater", "zine", "magazine", "book", "novel"
    );

    public ArticlesResponse getLatestArticles() {
        RestTemplate restTemplate = new RestTemplate();
        String url = String.format(API_URL, apiKey);
        ResponseEntity<ArticlesResponse> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                ArticlesResponse.class
        );
        ArticlesResponse articlesResponse = response.getBody() != null ? response.getBody() : new ArticlesResponse();

        if (articlesResponse.getArticles() != null) {
            List<SpaceflightNewsArticle> filtered = articlesResponse.getArticles().stream()
                    .filter(article -> containsStrongSpaceKeyword(article.getTitle()))
                    .filter(article -> !containsExcludeKeyword(article.getTitle()) && !containsExcludeKeyword(article.getDescription()))
                    .collect(Collectors.toList());
            articlesResponse.setArticles(filtered);
            articlesResponse.setTotalResults(filtered.size());
        }

        return articlesResponse;
    }

    private boolean containsStrongSpaceKeyword(String text) {
        if (text == null) return false;
        String lower = text.toLowerCase(Locale.ROOT);
        return STRONG_SPACE_KEYWORDS.stream().anyMatch(lower::contains);
    }

    private boolean containsExcludeKeyword(String text) {
        if (text == null) return false;
        String lower = text.toLowerCase(Locale.ROOT);
        return EXCLUDE_KEYWORDS.stream().anyMatch(lower::contains);
    }
}
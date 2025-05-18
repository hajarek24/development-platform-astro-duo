package com.backend.space_gateway.model;

import lombok.Data;

@Data
public class SpaceflightNewsArticle {
    private String title;
    private String url;
    private String urlToImage;
    private Source source;
    private String description;
    private String publishedAt;
    private String author;
    private String content;
}
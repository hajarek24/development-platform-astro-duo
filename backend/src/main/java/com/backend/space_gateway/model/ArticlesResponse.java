package com.backend.space_gateway.model;

import lombok.Data;
import java.util.List;

@Data
public class ArticlesResponse {
    private String status;
    private int totalResults;
    private List<SpaceflightNewsArticle> articles;
}
package com.backend.space_gateway.model;

import lombok.Data;

@Data
public class ApodResponse {
    private String date;
    private String explanation;
    private String hdurl;
    private String media_type;
    private String service_version;
    private String title;
    private String url;
    private String copyright;
}
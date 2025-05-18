package com.backend.space_gateway.model;

import lombok.Data;

@Data
public class SpaceEvent {
    private String title;
    private String date;
    private String description;
    private String type;
    private String imageUrl; // <-- Add this line
}
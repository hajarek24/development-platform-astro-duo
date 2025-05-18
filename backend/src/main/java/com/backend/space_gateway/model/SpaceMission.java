package com.backend.space_gateway.model;

import lombok.Data;

@Data
public class SpaceMission {
    private String name;
    private String status;
    private String launch_date;
    private String description;
    private String agency;
    private String imageUrl; // <-- Add this line
}
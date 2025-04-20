package com.backend.space_gateway.model;

import lombok.Data;
import java.util.List;

@Data
public class ImageLibraryResponse {
    private Collection collection;

    @Data
    public static class Collection {
        private String version;
        private String href;
        private List<Item> items;
        private Metadata metadata;
    }

    @Data
    public static class Item {
        private String href;
        private List<ImageData> data;
        private List<Link> links;
    }

    @Data
    public static class ImageData {
        private String center;
        private String title;
        private String nasa_id;
        private String media_type;
        private String date_created;
        private String description;
    }

    @Data
    public static class Link {
        private String href;
        private String rel;
        private String render;
    }

    @Data
    public static class Metadata {
        private int total_hits;
    }
}
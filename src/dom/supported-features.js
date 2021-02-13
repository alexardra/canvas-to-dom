export const TagProperties = [
    "center",
    "width", "height", "diameter", "points",
    "color",
    "zOrder",
    "orientation"
];

export const TagPropertyMap = {
    "canvas": ["width", "height", "center", "z-order", "orientation", "color"],
    "line": ["point-0", "point-1", "center", "z-order", "orientation", "color"],
    "triangle": ["point-0", "point-1", "point-2", "center", "z-order", "orientation", "color"],
    "rectangle": ["width", "height", "center", "z-order", "orientation", "color"],
    "square": ["width", "height", "center", "z-order", "orientation", "color"],
    "circle": ["diameter", "center", "z-order", "orientation", "color"],
    "polygon": ["point", "center", "z-order", "orientation", "color"]
}

export const TagPatterns = {
    "center": /(\((-?\d+(\.\d{1,2})?)\s?\,\s?(-?\d+(\.\d{1,2})?)\))/,
    "width": /(\d+(\.\d{1,2})?)/,
    "height": /(\d+(\.\d{1,2})?)/,
    "diameter": /(\d+(\.\d{1,2})?)/,
    "z-order": /(^[-+]?\d+$)/,
    "point": /(\((-?\d+(\.\d{1,2})?)\s?\,\s?(-?\d+(\.\d{1,2})?)\))/,
    "orientation": /(\b([1-2]?[0-9]?[0-9]|3[0-5][0-9]|360)\b)/,
    "color": /(#[0-9a-f])/
}

export const Tags = [
    "line",
    "triangle",
    "rectangle",
    "square",
    "pentagon",
    "hexagon",
    "octagon",
    "polygon",
    "circle",
    "ellipse"
]

export const SupportedOptions = {
    "type": {
        "default": "document",
        "supported": ["text/html", "json", "document"],
    },
    "fragment": {
        "default": { "x": "", "y": "", "width": "", "height": "" },
        "supportedProperties": ["x", "y", "width", "height"],
        "requiredProperties": ["x", "y", "width", "height"]
    }
}
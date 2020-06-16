export const TagProperties = [
    "center",
    "width", "height", "diameter", "points",
    "color",
    "zOrder",
    "orientation"
];

export const TagPatterns = {
    "center": /(\((-?\d+(\.\d{1,2})?)\s?\,\s?(-?\d+(\.\d{1,2})?)\))/,
    "width": /(\d+(\.\d{1,2})?)/,
    "height": /(\d+(\.\d{1,2})?)/,
    "diameter": /(\d+(\.\d{1,2})?)/,
    "z-order": /(\d+)/,
    "point": /(\((-?\d+(\.\d{1,2})?)\s?\,\s?(-?\d+(\.\d{1,2})?)\))/,
    "orientation": /(\b([1-2]?[0-9]?[0-9]|3[0-5][0-9]|360)\b)/,
    "color": /(#[0-9a-f]{8})/
}

export const Tags = [
    "triangle",
    "rectangle",
    "square",
    "pentagon",
    "hexagon",
    "octagon",
    "polygon",
    "circle"
]
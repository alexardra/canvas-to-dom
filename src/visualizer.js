export class Visualizer {

    constructor() {
    }

    render(node, result) {
        let children = node.children;
        if (children.length > 0) {
            let element = this.startFormatedTag(node, "ul");
            for (let i = 0; i < children.length; i++) {
                this.render(children[i], element);
            }
            element.appendChild(this.endFormatedTag(node, "ul"));
            result.appendChild(element);
        } else {
            let element = this.startFormatedTag(node, "li");
            element.appendChild(this.endFormatedTag(node, "li"))
            result.appendChild(element);
        }
    }

    startFormatedTag(node, el) {
        let attributes = Array.from(node.attributes);

        let li = document.createElement(el);
        let start = document.createElement("span");
        start.classList.add("name");
        let startText = attributes.length == 0 ? "<" + node.nodeName.toLowerCase() : "<" + node.nodeName.toLowerCase() + " ";
        start.appendChild(document.createTextNode(startText));
        li.appendChild(start);

        for (let i = 0; i < attributes.length; i++) {
            let attribute = document.createElement("span");
            attribute.classList.add("attribute");
            let attributeName = document.createElement("span");
            attributeName.appendChild(document.createTextNode(attributes[i].name + "="));
            let attributeValue = document.createElement("span");


            let attributeText = i == attributes.length - 1 ? '"' + attributes[i].value + '"' : '"' + attributes[i].value + '"' + " ";
            if (attributes[i].value.startsWith("#")) {
                attributeValue.style.color = attributes[i].value;
            }
            attributeValue.appendChild(document.createTextNode(attributeText));
            attribute.appendChild(attributeName);
            attribute.appendChild(attributeValue);
            li.appendChild(attribute);
        }
        if (el == "ul") {
            let end = document.createElement("span");
            end.classList.add("name");
            end.appendChild(document.createTextNode(">"));
            li.appendChild(end);
        }
        return li;
    }

    endFormatedTag(node, el) {
        let end = document.createElement("span");
        end.classList.add("name");
        let text = el == "ul" ? "</" + node.nodeName.toLowerCase() + ">" : "/>";
        end.appendChild(document.createTextNode(text));
        return end;
    }
}
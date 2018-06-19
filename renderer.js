import React from 'react';
import Reconciler from 'react-reconciler';
import emptyObject from 'fbjs/lib/emptyObject';
import {View, Text} from "./elements";

const hostConfig = {
  // appendChild for direct children
  appendInitialChild(parentInstance, child) {
      parentInstance.append(child)
  },

  // Create the DOMElement, but attributes are set in `finalizeInitialChildren`
  createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {

      if (type === "View") {
        global.vmCreateInstance(type, props);
        return new View(props)
      }

      if (type === "Text") {
        return new Text()
      }

      throw new Error(`couldn't handle: ${type}`);

  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    // A TextNode instance is returned because literal strings cannot change their value later on update
    // return document.createTextNode(text);
      throw new Error("create text instance")
  },

  // Actually set the attributes and text content to the domElement and check if
  // it needs focus, which will be eventually set in `commitMount`
  finalizeInitialChildren(element, type, props) {
    return element
  },

  // Useful only for testing
  getPublicInstance(inst) {
      throw new Error("hi getPublicInstance")
  },

  // Commit hooks, useful mainly for react-dom syntethic events
  prepareForCommit(containerInfo) {
    console.log("prepareForCommit");
  },
  resetAfterCommit() {
      console.log("reset after commit");
  },

  // Calculate the updatePayload
  prepareUpdate(domElement, type, oldProps, newProps) {
      throw new Error("hi")
  },

  getRootHostContext(rootInstance) {
    return emptyObject
  },
  getChildHostContext(parentHostContext, type) {
      return emptyObject
  },

  shouldSetTextContent(type, props) {
      return (
          typeof props.children === 'string' ||
          typeof props.children === 'number'
      );
  },

  now: () => {
    // noop
  },

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      parentInstance.appendChild(child);
    },

    // appendChild to root container
    appendChildToContainer(parentInstance, child) {
        parentInstance.appendChild(child);
    },

    removeChild(parentInstance, child) {
      parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      parentInstance.removeChild(child);
    },

    insertBefore(parentInstance, child, beforeChild) {
      parentInstance.insertBefore(child, beforeChild);
    },

    insertInContainerBefore(parentInstance, child, beforeChild) {
      parentInstance.insertBefore(child, beforeChild);
    },

    commitUpdate(domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
      console.log("--- commit updated ---");
        console.log(type);
        console.log("----------------------")
    },

    commitMount(domElement, type, newProps, internalInstanceHandle) {
      //@todo this might be useful
    },

    commitTextUpdate(textInstance, oldText, newText) {
      textInstance.nodeValue = newText;
    },

    resetTextContent(domElement) {
      domElement.textContent = '';
    },
  },
};

const TinyDOMRenderer = Reconciler(
    hostConfig
);

export const ReactTinyDOM = {
  render(element, domContainer, callback) {
    let root = domContainer._reactRootContainer;
    if (!root) {
        // Remove all children of the domContainer
      let rootSibling;
        while ((rootSibling = domContainer.lastChild)) {
            domContainer.removeChild(rootSibling);
        }
      const newRoot = TinyDOMRenderer.createContainer(domContainer);

        root = domContainer._reactRootContainer = newRoot;
    }

    return TinyDOMRenderer.updateContainer(element, root, null, callback);
  },
};

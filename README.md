A simple script to extract list of class members from JavaScript file containing `Ext.define(...)`.

To install:

    git clone git://github.com/nene/extract_ext_define.git
    cd extract_ext_define/
    npm install

To use:

    node extract.js path/to/extjs/src/Component.js

Produces:

    class: Ext.Component
        alias
        extend
        requires
        uses
        mixins
        statics
        resizeHandles
        floating
        toFrontOnShow
        hideMode
        hideParent
        ariaRole
        bubbleEvents
        actionMode
        monPropRe
        constructor
        initComponent
        afterRender
        initAria
        setAutoScroll
        makeFloating
        initResizable
        getDragEl
        initDraggable
        setPosition
        afterSetPosition
        showAt
        setPagePosition
        getBox
        updateBox
        getOuterSize
        adjustPosition
        getPosition
        getId
        onEnable
        onDisable
        show
        beforeShow
        onShow
        afterShow
        onShowComplete
        hide
        onHide
        afterHide
        onDestroy
        deleteMembers
        focus
        getFocusEl
        blur
        getEl
        getResizeEl
        getPositionEl
        getActionEl
        getVisibilityEl
        onResize
        getBubbleTarget
        getContentTarget
        cloneConfig
        getXType
        findParentBy
        findParentByType
        bubble
        getProxy


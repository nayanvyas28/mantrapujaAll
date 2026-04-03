"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

export default function VisualEditorOverlay() {
    const searchParams = useSearchParams();
    const isEditMode = searchParams.get("edit") === "true";
    const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);
    const [selectedRect, setSelectedRect] = useState<DOMRect | null>(null);
    const [hoveredLabel, setHoveredLabel] = useState<string>("");
    const [selectedLabel, setSelectedLabel] = useState<string>("");
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, target: HTMLElement } | null>(null);

    // Track selected element reference for updates
    const selectedElementRef = useState<HTMLElement | null>(null); // Actually better to use useRef if we want to access it in event listener
    // But since we are inside useEffect which has dependencies...
    // Let's use a module-level variable or a ref that persists across renders
    // We can't use useRef inside the component easily for the event listener without re-binding.

    // Ref approach
    const selectedRef = useRef<HTMLElement | null>(null);


    useEffect(() => {
        // --- STRICT ISOLATION GUARD ---
        // This component (VisualEditorOverlay) is ONLY for the Site Preview Iframe.
        // It must NEVER attach listeners to the Admin Parent Window.

        const isTopWindow = typeof window !== 'undefined' && window.self === window.top;

        // Use a more robust check for "Am I in the Admin Tool?"
        const isAdminPath = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin/visual-editor');

        if (isTopWindow || isAdminPath) {
            // If we are on the Visual Editor Admin Page (Parent), NEVER run this overlay.
            // The overlay belongs ONLY to the Site Preview (Child Iframe).
            console.log("VisualEditorOverlay: Disabled on Admin Page (Parent)");

            // DEBUG: Visual Proof that we are disabled? 
            // Actually, let's show a big RED border if we mistakenly think we are active but are in the admin tool due to logic error.
            if (isEditMode) {
                const debugDiv = document.createElement('div');
                debugDiv.style.position = 'fixed';
                debugDiv.style.top = '0';
                debugDiv.style.left = '0';
                debugDiv.style.width = '100vw';
                debugDiv.style.height = '10px';
                debugDiv.style.zIndex = '99999999';
                debugDiv.style.background = 'red';
                debugDiv.innerText = 'OVERLAY ACTIVE IN ADMIN TOOL (ERROR)';
                debugDiv.style.color = 'white';
                debugDiv.style.fontSize = '10px';
                debugDiv.style.pointerEvents = 'none';
                // document.body.appendChild(debugDiv); // Uncomment to test
            }
            return;
        }

        if (!isEditMode) return;

        console.log("VisualEditorOverlay: Active (Inside Iframe)");

        const handleMouseOver = (e: MouseEvent) => {
            e.stopPropagation();
            const target = e.target as HTMLElement;
            if (target === document.body || target.id === "visual-editor-overlay-container" || target.closest('#visual-editor-overlay-container')) return;

            const rect = target.getBoundingClientRect();
            setHoveredRect(rect);
            setHoveredLabel(`${target.tagName.toLowerCase()}${target.id ? `#${target.id}` : ""}`);
        };



        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // If we are already editing this element, let the click pass through so user can move cursor
            if (target.isContentEditable) return;

            // 1. Check if we clicked the overlay UI (Context Menu, etc.) OR the Portal Modal (Preview)
            // If so, let the event pass through to the button handlers!
            if (target === document.body ||
                target.id === "visual-editor-overlay-container" ||
                target.closest('#visual-editor-overlay-container') ||
                target.closest('.visual-editor-portal-modal') // Ignore Portal Modal clicks!
            ) {
                // But wait, if we clicked the Context Menu, we DO want to process the click on the button.
                // So verify we don't preventDefault/stopProp here.

                // Also close context menu if we clicked strictly outside it?
                // No, standard behavior: clicking menu item keeps menu open until action completes.
                return;
            }

            // 2. Otherwise, we clicked a page element. Intercept it.
            e.preventDefault();
            e.stopPropagation();

            console.log("Overlay clicked element:", target.tagName);

            // Close context menu if open
            setContextMenu(null);

            const rect = target.getBoundingClientRect();
            setSelectedRect(rect);
            setSelectedLabel(`${target.tagName.toLowerCase()}${target.id ? `#${target.id}` : ""}`);

            // Update Ref
            selectedRef.current = target;

            // Send message to parent
            const computedStyle = window.getComputedStyle(target);
            window.parent.postMessage({
                type: 'ELEMENT_SELECTED',
                payload: {
                    tagName: target.tagName,
                    id: target.id,
                    className: target.className,
                    innerText: target.innerText.substring(0, 50), // Preview text
                    rect: rect,
                    styles: {
                        color: computedStyle.color,
                        backgroundColor: computedStyle.backgroundColor,
                        fontSize: computedStyle.fontSize,
                        fontWeight: computedStyle.fontWeight,
                        textAlign: computedStyle.textAlign,
                        marginTop: computedStyle.marginTop,
                        marginBottom: computedStyle.marginBottom,
                        padding: computedStyle.padding,
                        display: computedStyle.display,
                        flexDirection: computedStyle.flexDirection,
                        justifyContent: computedStyle.justifyContent,
                        alignItems: computedStyle.alignItems,
                        borderRadius: computedStyle.borderRadius,
                        borderWidth: computedStyle.borderWidth,
                        borderColor: computedStyle.borderColor,
                    }
                }
            }, '*');
        };

        const handleDoubleClick = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const target = e.target as HTMLElement;
            // Avoid editing the overlay itself
            if (target.id === "visual-editor-overlay-container" || target.closest('#visual-editor-overlay-container')) return;

            console.log("Double click detected on:", target.tagName);

            // Clear selection box so it doesn't overlap the blue edit outline
            setSelectedRect(null);

            // Make Editable
            target.contentEditable = "true";
            target.focus();
            target.style.outline = "2px solid #3b82f6"; // Solid blue
            target.style.outlineOffset = "2px";
            target.style.borderRadius = "2px";
            target.style.minWidth = "10px"; // Ensure it doesn't collapse

            // Add a class to indicate editing state for global styles
            target.classList.add('visual-editor-active');

            // Clean up on blur
            const handleBlur = () => {
                target.contentEditable = "false";
                target.style.outline = "";
                target.style.outlineOffset = "";
                target.style.borderRadius = "";
                target.style.minWidth = "";
                target.classList.remove('visual-editor-active');

                target.removeEventListener('blur', handleBlur);
                target.removeEventListener('input', handleInput);
            };

            // Capture changes
            const handleInput = () => {
                const root = document.getElementById('website-content-root');
                if (root) {
                    window.parent.postMessage({
                        type: 'UPDATE_CONTENT',
                        payload: root.innerHTML
                    }, '*');
                }
            };

            target.addEventListener('blur', handleBlur);
            target.addEventListener('input', handleInput);
        };

        // Drop Handler
        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const data = e.dataTransfer?.getData("application/json") || e.dataTransfer?.getData("text/plain"); // Handle Asset URL drop too?
            if (!data) return;

            // Check if it's a URL (from AssetManager)
            if (data.startsWith('http')) {
                const target = e.target as HTMLElement;
                if (target.tagName === 'IMG') {
                    (target as HTMLImageElement).src = data;
                } else {
                    // Insert as image
                    target.insertAdjacentHTML('beforeend', `<img src="${data}" class="w-full h-auto rounded" />`);
                }
                // Trigger update
                const root = document.getElementById('website-content-root');
                if (root) window.parent.postMessage({ type: 'UPDATE_CONTENT', payload: root.innerHTML }, '*');
                return;
            }

            try {
                const component = JSON.parse(data);
                const target = e.target as HTMLElement;

                // Simple insertion: Append to target
                if (target && target.insertAdjacentHTML) {
                    // content is now { html: "..." }
                    const htmlContent = component.content.html || component.content; // Fallback for legacy
                    target.insertAdjacentHTML('beforeend', htmlContent);

                    // Trigger update
                    const root = document.getElementById('website-content-root');
                    if (root) {
                        window.parent.postMessage({
                            type: 'UPDATE_CONTENT',
                            payload: root.innerHTML
                        }, '*');
                    }
                }
            } catch (err) {
                console.error("Failed to drop component", err);
            }
        };

        // Message Listener for Properties Panel updates
        const handleParentMessage = (event: MessageEvent) => {
            if (event.data?.type === 'UPDATE_ATTRIBUTE') {
                const { id, attribute, value } = event.data.payload;
                if (id) {
                    const target = document.getElementById(id);
                    if (target) {
                        target.setAttribute(attribute, value);
                        // Trigger Content Update
                        const root = document.getElementById('website-content-root');
                        if (root) window.parent.postMessage({ type: 'UPDATE_CONTENT', payload: root.innerHTML }, '*');
                    }
                }
            }

            if (event.data?.type === 'UPDATE_STYLE') {
                const { id, style, value } = event.data.payload;
                // Use ID if available, otherwise try ref (captured when selected)
                const target = id ? document.getElementById(id) : selectedRef.current;

                if (target) {
                    // Update Style
                    // @ts-ignore
                    target.style[style] = value;

                    // Trigger Content Update
                    const root = document.getElementById('website-content-root');
                    if (root) window.parent.postMessage({ type: 'UPDATE_CONTENT', payload: root.innerHTML }, '*');
                }
            }

            if (event.data?.type === 'UPDATE_TEXT') {
                const { id, text } = event.data.payload;
                const target = id ? document.getElementById(id) : selectedRef.current;
                if (target) {
                    target.innerText = text; // or innerHTML if we want rich text? For now innerText safer for simple binding
                    // Trigger Content Update
                    const root = document.getElementById('website-content-root');
                    if (root) window.parent.postMessage({ type: 'UPDATE_CONTENT', payload: root.innerHTML }, '*');
                }
            }
        };
        window.addEventListener('message', handleParentMessage);

        // Add listeners with capture to ensure we get them first
        document.addEventListener("mouseover", handleMouseOver, true);
        document.addEventListener("click", handleClick, true);
        document.addEventListener("dblclick", handleDoubleClick, true);
        document.addEventListener("dragover", handleDragOver, true);
        document.addEventListener("drop", handleDrop, true);

        return () => {
            window.removeEventListener('message', handleParentMessage);
            document.removeEventListener("mouseover", handleMouseOver, true);
            document.removeEventListener("click", handleClick, true);
            document.removeEventListener("dblclick", handleDoubleClick, true);
            document.removeEventListener("dragover", handleDragOver, true);
            document.removeEventListener("drop", handleDrop, true);
        };
    }, [isEditMode]);

    // Context Menu State - Moved to top

    useEffect(() => {
        if (!isEditMode || window.self === window.top) return;

        // ... existing listeners ...

        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            const target = e.target as HTMLElement;
            if (target === document.body || target.id === "visual-editor-overlay-container" || target.closest('#visual-editor-overlay-container')) return;

            setContextMenu({ x: e.clientX, y: e.clientY, target });
        };

        // Close menu on click - handled by handleClick now for elements, 
        // but we still need to handle clicks on the buttons inside the menu?
        // Actually, handleClick returns early for overlay elements, so they behave normally.
        // We only need to ensure clicking "somewhere else" closes it.
        // Since handleClick handles "somewhere else" (page elements) and calls setContextMenu(null), we are good there.
        // What about clicking the Overlay "container" empty space? (id="visual-editor-overlay-container")
        // That element is pointer-events-none, so clicks pass through to Body?
        // If they pass to Body, handleClick sees Body?
        // Line 49 excludes Body.

        // Let's add a global click listener to window just in case, but rely on handleClick for most.
        const closeMenu = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('#visual-editor-overlay-container') && !target.closest('.visual-editor-portal-modal')) {
                setContextMenu(null);
            }
        };

        window.addEventListener('click', closeMenu);
        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            // ... existing cleanups ...
            window.removeEventListener('click', closeMenu);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, [isEditMode]);

    const handleSaveComponent = (e: React.MouseEvent) => {
        // Prevent bubbling so closeMenu doesn't immediately kill it?
        // React events bubble.
        e.stopPropagation();

        if (!contextMenu) return;
        const name = prompt("Enter a name for this component:");
        if (!name) return;

        console.log("Saving component:", name, contextMenu.target);

        // Send to parent to save
        window.parent.postMessage({
            type: 'SAVE_COMPONENT',
            payload: {
                name,
                content: { html: contextMenu.target.outerHTML }, // Wrap as JSON object
                category: 'General'
            }
        }, '*');
        setContextMenu(null);
    };

    if (!isEditMode) return null;

    // Also return null if on admin page (double safety)
    if (typeof window !== 'undefined' && window.location.pathname.includes('/admin/visual-editor')) {
        return null;
    }

    return (
        <div id="visual-editor-overlay-container" className="fixed inset-0 pointer-events-none z-[99999]">
            {/* Hover Box */}
            {hoveredRect && (
                <div
                    style={{
                        position: "fixed",
                        top: hoveredRect.top,
                        left: hoveredRect.left,
                        width: hoveredRect.width,
                        height: hoveredRect.height,
                        border: "2px solid #3b82f6", // Blue-500
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        transition: "all 0.1s ease-out",
                        pointerEvents: "none",
                    }}
                >
                    <span className="absolute -top-6 left-0 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-t font-mono">
                        {hoveredLabel}
                    </span>
                </div>
            )}

            {/* Selected Box */}
            {selectedRect && (
                <div
                    style={{
                        position: "fixed",
                        top: selectedRect.top,
                        left: selectedRect.left,
                        width: selectedRect.width,
                        height: selectedRect.height,
                        border: "2px solid #ef4444", // Red-500
                        pointerEvents: "none",
                    }}
                >
                    <span className="absolute -top-6 left-0 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-t font-mono">
                        {selectedLabel}
                    </span>
                </div>
            )}

            {/* Context Menu */}
            {contextMenu && (
                <div
                    className="fixed bg-white border border-gray-200 shadow-lg rounded py-1 pointer-events-auto z-[100000]"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <button
                        onClick={handleSaveComponent}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Save as Component
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 opacity-50 cursor-not-allowed"
                    >
                        Replace Image (Select img first)
                    </button>
                </div>
            )}
        </div>
    );
}

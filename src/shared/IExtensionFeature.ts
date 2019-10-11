/**
 * An extension feature is in charge of a specific piece of functionality of the
 * extension. It does not have to worry about whether the F1TV page has been
 * loaded as long as the feature is not initialized before {@see onPageLoaded}
 * is called.
 */
export interface IExtensionFeature {
    /**
     * Called when the F1TV page is fully constructed. This takes into account
     * the front-end javascript manipulations, so this event does not correspond
     * to the 'DOMContentLoaded' event perse.
     */
    onPageLoaded(): void;
}

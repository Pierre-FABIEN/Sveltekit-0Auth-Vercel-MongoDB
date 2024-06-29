import * as THREE from 'three';

class RenderService {
	private renderer: THREE.WebGLRenderer | null = null;

	public initRenderer() {
		// Vérifiez que vous êtes côté client
		if (typeof document !== 'undefined') {
			this.renderer = new THREE.WebGLRenderer({ antialias: true });
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.renderer.shadowMap.enabled = true;
			this.renderer.shadowMap.needsUpdate = true;
			this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			console.log(this.renderer);

			// Le code pour ajouter le renderer au DOM sera déplacé dans le composant Svelte
		}
	}

	public getRenderer(): THREE.WebGLRenderer | null {
		return this.renderer;
	}

	public render(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
		if (this.renderer) {
			this.renderer.render(scene, camera);
		}
	}
}

export const renderService = new RenderService();

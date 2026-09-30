
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/bitacoras" | "/dashboard" | "/egresados" | "/empresas" | "/evaluaciones" | "/login" | "/perfil" | "/postulaciones" | "/practicas" | "/usuarios";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/bitacoras": Record<string, never>;
			"/dashboard": Record<string, never>;
			"/egresados": Record<string, never>;
			"/empresas": Record<string, never>;
			"/evaluaciones": Record<string, never>;
			"/login": Record<string, never>;
			"/perfil": Record<string, never>;
			"/postulaciones": Record<string, never>;
			"/practicas": Record<string, never>;
			"/usuarios": Record<string, never>
		};
		Pathname(): "/" | "/bitacoras" | "/dashboard" | "/egresados" | "/empresas" | "/evaluaciones" | "/login" | "/perfil" | "/postulaciones" | "/practicas" | "/usuarios";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/Fondo_Login.png" | "/Fondo_Modulos.jpg" | "/robots.txt" | string & {};
	}
}
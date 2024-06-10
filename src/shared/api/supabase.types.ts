export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
	public: {
		Tables: {
			'table [22.12.2023]': {
				Row: {
					Aluminium_Stiffness: number | null
					Autoclave_Cost: string | null
					Carbon_Stiffness: number | null
					Description: string | null
					id: string
					IDx: number | null
					IDy: number | null
					Labour_Cost: string | null
					Laminate: string | null
					Material: number | null
					Material_Cost: string | null
					Price: number | null
					Section: string | null
					Shape: string | null
					Syteline_Code: string | null
					Wall: number | null
					Weight: number | null
				}
			}
		}
	}
}

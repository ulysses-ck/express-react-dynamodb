export type ILanguage = {
	Id: {
		S: string;
	};
	ProgrammingLanguage: {
		S: string;
	};
	Info: {
		M: {
			Designer: { S: string };
			Year: { S: string };
		};
	};
	IsActive: { BOOL: boolean };
};

export interface SignUpForm {
    name?: string;
    email?: string;
    password?: string;
}
export interface ResType {
data: {
    status?: number | string;
    success?: boolean;
    message?: string;
    token?: string;
}
}

export interface TokenInterface {
    token: string
}

export interface Data {
    exprenses?:{
        createdAt?: string;
        value?: number;
        description?: string;
        id?: string;
        type?: string;
    } [];
    balance?: number;
    totalCredit?: number;
    totalDebit?: number;
    name?: string;
}

export interface exprenses{
    createdAt?: string;
    value?: number;
    description?: string;
    id?: string;
    type?: string;
}

export interface EmailOne {
    email: {
        email: string,
    }
}
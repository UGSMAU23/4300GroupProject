'use server'

import { signIn, signOut } from "@/auth"

export async function doLogOut() {
    await signOut({redirectTo: "/"});
}

export async function doCredentialsLogin(formData: FormData): Promise<any> {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        return response;
    } catch (e: any) {
        throw e;
    }
}
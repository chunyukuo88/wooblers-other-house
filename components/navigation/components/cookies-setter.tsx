"use client";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";

export function CookiesSetter() {
    const searchParams = useSearchParams();
    const howzit = searchParams.get('howzit');
    useEffect(() => {
        if (howzit === 'true') {
            document.cookie = 'howzit=true';
        }
    }, [howzit]);

    return null;
}
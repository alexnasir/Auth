"use client";

import { Card, CardFooter, CardContent, CardHeader } from "../ui/card";
import BackButtton from "./backbutton";
import { Header } from "./header";
import Social from "./social";


interface CardWrapperProps {
    children: React.ReactNode;
    headerlabel: string;
    backButttonLabel: string;
    backButtonHref: string;
    showSocial: boolean;
}

export const CardWrapper = ({
    children,
    headerlabel,
    backButtonHref,
    backButttonLabel,
    showSocial
}:CardWrapperProps) => {
     return (
        <Card className="w-[400px] shadow-md">
            <CardHeader />
            <Header label={headerlabel}/>
            <CardContent>
            {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButtton
                label= {backButttonLabel}
                href =   {backButtonHref}
                />
            </CardFooter>
           
        </Card>
     )
}
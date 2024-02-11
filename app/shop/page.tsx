"use client";
import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Spacer, Divider } from '@nextui-org/react';

export default function Shop() {
  return (
    <section className="relative overflow-hidden">
      <Card className="max-w-[300px]">
            <CardHeader className="text-white">Filter By</CardHeader>
            <Divider/>
            <CardBody className="p-0">
                <div>
                <CardHeader className="text-white">Price</CardHeader>
                      
                </div>
                  
            </CardBody>
            <CardFooter></CardFooter>
      </Card>
    </section>
  );
}

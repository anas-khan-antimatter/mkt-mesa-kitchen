"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function SubscribeSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="subscribe"
      className="bg-primary py-20 sm:py-28"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl tracking-tight text-primary-foreground sm:text-4xl">
            Ready to Eat Well?
          </h2>
          <p className="mt-3 text-lg text-primary-foreground/80">
            Join thousands of Mesa members and transform your weeknight dinner.
            Get 20% off your first box.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-md">
          {submitted ? (
            <div className="rounded-xl bg-white/10 p-8 text-center backdrop-blur-sm">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/20">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="font-heading text-xl text-primary-foreground">
                You&apos;re In!
              </h3>
              <p className="mt-2 text-primary-foreground/80">
                Welcome to Mesa. Check your email to confirm your subscription
                and claim your 20% discount.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-xl bg-white/10 p-6 backdrop-blur-sm sm:p-8"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-primary-foreground/90"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  required
                  className="border-primary-foreground/20 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-primary-foreground/90"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="border-primary-foreground/20 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="plan"
                  className="text-primary-foreground/90"
                >
                  Preferred Plan
                </Label>
                <Select required>
                  <SelectTrigger
                    id="plan"
                    className="border-primary-foreground/20 bg-white/10 text-primary-foreground focus:border-primary-foreground/50"
                  >
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter — $49/wk</SelectItem>
                    <SelectItem value="family">
                      Family — $79/wk (Most Popular)
                    </SelectItem>
                    <SelectItem value="feast">Feast — $119/wk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="w-full font-semibold"
              >
                Claim 20% Off
              </Button>
              <p className="text-center text-xs text-primary-foreground/60">
                By signing up, you agree to our Terms of Service. 20%
                discount applies to your first box only.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
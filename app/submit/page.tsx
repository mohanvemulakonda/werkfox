"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Rocket,
  ChevronRight,
  ChevronLeft,
  Upload,
  Check,
  Globe,
  Tag,
  Image as ImageIcon,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const PRICING_OPTIONS = [
  { value: "FREE", label: "Free" },
  { value: "FREEMIUM", label: "Freemium" },
  { value: "PAID", label: "Paid" },
  { value: "OPEN_SOURCE", label: "Open Source" },
  { value: "CONTACT", label: "Contact for Pricing" },
];

const STEPS = [
  { label: "Basic Info", icon: Globe },
  { label: "Details", icon: Tag },
  { label: "Media", icon: ImageIcon },
];

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function SubmitToolPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Form fields
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [pricing, setPricing] = useState("FREE");
  const [tags, setTags] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {});
  }, []);

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  function canProceed(): boolean {
    if (step === 1) {
      return !!(name.trim() && tagline.trim() && website.trim() && description.trim());
    }
    if (step === 2) {
      return !!categoryId;
    }
    return true;
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("tagline", tagline);
      formData.append("website", website);
      formData.append("description", description);
      formData.append("categoryId", categoryId);
      formData.append("pricing", pricing);
      formData.append("tags", tags);
      if (logo) {
        formData.append("logo", logo);
      }

      const res = await fetch("/api/tools", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit tool");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Tool submitted for review!
        </h1>
        <p className="mt-3 text-[var(--text-secondary)]">
          Our team will review your submission and publish it once approved.
          You can track the status on your dashboard.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
          <Rocket size={24} />
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
          Submit Your Tool
        </h1>
        <p className="mt-2 text-[var(--text-secondary)]">
          Share your tool with the community. It&apos;ll go live after a quick review.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="mb-10 flex items-center justify-center">
        {STEPS.map((s, i) => {
          const stepNum = i + 1;
          const active = step === stepNum;
          const completed = step > stepNum;
          const Icon = s.icon;

          return (
            <div key={s.label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                    completed
                      ? "border-brand-500 bg-brand-500 text-white"
                      : active
                        ? "border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400"
                        : "border-[var(--border)] bg-[var(--bg)] text-[var(--text-tertiary)]"
                  }`}
                >
                  {completed ? <Check size={18} /> : <Icon size={18} />}
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    active || completed
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-[var(--text-tertiary)]"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-3 mb-6 h-0.5 w-12 sm:w-20 ${
                    completed
                      ? "bg-brand-500"
                      : "bg-[var(--border)]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Form Card */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 sm:p-8">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-5">
            <Input
              label="Tool Name"
              placeholder="e.g. Vercel, Notion, Linear"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Tagline"
              placeholder="A short description in one sentence"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              hint="Keep it under 80 characters"
              required
            />
            <Input
              label="Website URL"
              type="url"
              placeholder="https://example.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
            <Textarea
              label="Description"
              placeholder="Tell the community what your tool does, who it's for, and what makes it unique..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="space-y-5">
            <Select
              label="Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select a category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
            <Select
              label="Pricing"
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
            >
              {PRICING_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
            <Input
              label="Tags"
              placeholder="e.g. AI, developer-tools, productivity"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              hint="Comma-separated tags to help people find your tool"
            />
          </div>
        )}

        {/* Step 3: Media */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Logo
              </label>
              <div className="flex items-center gap-6">
                {logoPreview ? (
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--border)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--bg-secondary)]">
                    <ImageIcon size={24} className="text-[var(--text-tertiary)]" />
                  </div>
                )}
                <div className="flex-1">
                  <label
                    htmlFor="logo-upload"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <Upload size={16} />
                    {logo ? "Change Logo" : "Upload Logo"}
                  </label>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                  <p className="mt-2 text-xs text-[var(--text-tertiary)]">
                    Recommended: 256x256px, PNG or JPG
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <Button
              variant="secondary"
              onClick={() => setStep(step - 1)}
            >
              <ChevronLeft size={16} />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
            >
              Next
              <ChevronRight size={16} />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              loading={submitting}
              disabled={submitting}
            >
              <Rocket size={16} />
              Submit Tool
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

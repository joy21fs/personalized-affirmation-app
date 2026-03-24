"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, RefreshCw, ArrowLeft, Sparkles } from "lucide-react"

type Mood = "anxious" | "overwhelmed" | "tired" | "sad" | "motivated" | "other"
type Context = "work" | "relationships" | "health" | "future" | "general" | "other"

interface MoodOption {
  value: Mood
  label: string
  description: string
}

interface ContextOption {
  value: Context
  label: string
}

const moodOptions: MoodOption[] = [
  { value: "anxious", label: "Anxious", description: "Worried or uneasy about what's happening" },
  { value: "overwhelmed", label: "Overwhelmed", description: "There's too much going on right now" },
  { value: "tired", label: "Tired", description: "Drained or lacking energy" },
  { value: "sad", label: "Sad", description: "Feeling down or heavy-hearted" },
  { value: "motivated", label: "Motivated / Happy", description: "Ready to take on the day" },
  { value: "other", label: "Not sure", description: "Something else or a mix of feelings" },
]

const contextOptions: ContextOption[] = [
  { value: "work", label: "Work / Career" },
  { value: "relationships", label: "Relationships" },
  { value: "health", label: "Health / Body" },
  { value: "future", label: "Future Uncertainty" },
  { value: "general", label: "Just a general feeling" },
  { value: "other", label: "Something else" },
]

const affirmations: Record<Mood, Record<Context, string[]>> = {
  anxious: {
    work: [
      "You are capable of handling whatever challenges come your way at work. Take it one step at a time.",
      "Your worth is not defined by your productivity. You bring unique value just by being you.",
      "It's okay to not have all the answers. Growth comes from learning, not from perfection.",
    ],
    relationships: [
      "You deserve connections that feel safe and supportive. It's okay to set boundaries.",
      "The right people will understand your needs. You don't have to shrink yourself for anyone.",
      "Your feelings are valid. You're allowed to take up space in your relationships.",
    ],
    health: [
      "Your body is doing its best to support you. Be gentle with yourself today.",
      "Healing isn't linear. Every small step you take matters.",
      "You are more than your physical state. Your spirit is strong.",
    ],
    future: [
      "The future doesn't need to be figured out today. Right now, you are exactly where you need to be.",
      "Uncertainty is not a sign of failure—it's a sign of possibility.",
      "You have navigated difficult moments before, and you will again.",
    ],
    general: [
      "This feeling will pass. You are safe in this moment.",
      "Take a deep breath. You are doing better than you think.",
      "You don't have to carry everything alone. It's okay to rest.",
    ],
    other: [
      "Whatever you're facing, know that you have the strength within you.",
      "Be patient with yourself. You're handling more than anyone knows.",
      "This moment is temporary. Better days are ahead.",
    ],
  },
  overwhelmed: {
    work: [
      "You can only do one thing at a time, and that's enough. Prioritize what matters most.",
      "It's okay to ask for help. Strength includes knowing your limits.",
      "You don't have to finish everything today. Progress, not perfection.",
    ],
    relationships: [
      "It's okay to step back and recharge. Your relationships will be there when you return.",
      "You are not responsible for everyone's feelings. Your well-being matters too.",
      "Setting boundaries is an act of love—for yourself and others.",
    ],
    health: [
      "Listen to your body. Rest is not laziness—it's essential.",
      "You're doing the best you can with what you have right now.",
      "Small acts of self-care add up. Start with one kind thing for yourself today.",
    ],
    future: [
      "You don't have to solve the future today. Focus on this moment.",
      "Life unfolds in its own time. Trust the process.",
      "Your path doesn't have to look like anyone else's. You're on your own journey.",
    ],
    general: [
      "Take a moment to pause. You deserve a break.",
      "You're carrying a lot right now. It's okay to put some things down.",
      "One breath at a time. One step at a time. You've got this.",
    ],
    other: [
      "Whatever is weighing on you, remember: you've overcome difficult moments before.",
      "It's okay to feel overwhelmed. Acknowledge it, then be gentle with yourself.",
      "You don't have to have it all figured out. Just take the next small step.",
    ],
  },
  tired: {
    work: [
      "Rest is productive. Your body and mind need time to recharge.",
      "You've been working hard. It's okay to slow down.",
      "Your value at work isn't measured by how exhausted you are.",
    ],
    relationships: [
      "It's okay to take space when you need it. Real connections understand.",
      "You don't have to be 'on' for everyone all the time.",
      "Rest so you can show up as your best self—for yourself first.",
    ],
    health: [
      "Your body is asking for rest. Honor that request.",
      "Fatigue is a sign to pause, not push through. Listen to yourself.",
      "Healing takes energy. Be patient with your body's process.",
    ],
    future: [
      "You don't have to figure out the future when you're running on empty. Rest first.",
      "Clarity comes when you're rested. Give yourself permission to pause.",
      "The future will wait. Right now, take care of yourself.",
    ],
    general: [
      "It's okay to be tired. You've been doing a lot.",
      "Rest is not giving up—it's gathering strength.",
      "You deserve rest without guilt. Take it.",
    ],
    other: [
      "Whatever is draining you, know that rest is not weakness.",
      "You're allowed to pause and recharge. That's not laziness, it's wisdom.",
      "Take the rest you need. You'll feel better for it.",
    ],
  },
  sad: {
    work: [
      "It's okay to not be okay at work. You're human, not a machine.",
      "Your feelings don't diminish your capabilities. You can feel sad and still be competent.",
      "This season will pass. Be gentle with yourself as you move through it.",
    ],
    relationships: [
      "You deserve to be surrounded by people who lift you up.",
      "It's okay to lean on others. That's what connection is for.",
      "Your feelings are valid. You don't have to hide your sadness.",
    ],
    health: [
      "Your body and mind are connected. Care for both gently.",
      "Sadness is a part of being human. It doesn't define your whole story.",
      "Small comforts matter. Do something kind for yourself today.",
    ],
    future: [
      "Sadness now doesn't mean sadness forever. Better days are coming.",
      "The future holds possibilities you can't yet see. Hold on to hope.",
      "This is a chapter, not the whole book. Your story continues.",
    ],
    general: [
      "Let yourself feel what you feel. Sadness is not weakness.",
      "You are worthy of comfort and care, especially from yourself.",
      "This too shall pass. You are not alone in this.",
    ],
    other: [
      "Whatever brought you here, know that your feelings matter.",
      "It's okay to sit with sadness. You don't have to rush through it.",
      "You are stronger than you know, even on the hard days.",
    ],
  },
  motivated: {
    work: [
      "Your energy is powerful. Channel it into what matters most to you.",
      "You have everything you need to succeed. Trust your abilities.",
      "Keep going! Your dedication is inspiring.",
    ],
    relationships: [
      "Bring your positive energy to your connections. It's contagious in the best way.",
      "You attract what you put out. Keep spreading that warmth.",
      "Your relationships thrive when you show up authentically. Keep being you.",
    ],
    health: [
      "Your motivation to care for yourself is beautiful. Keep honoring your body.",
      "You're building healthy habits. Every small choice matters.",
      "Your energy is a gift. Use it to nurture your well-being.",
    ],
    future: [
      "The future is full of possibilities, and you're ready for them.",
      "Your positive mindset is shaping your path. Keep looking forward.",
      "Dream big. You have what it takes to make it happen.",
    ],
    general: [
      "Your positive energy is a gift to yourself and others.",
      "Keep riding this wave. You're exactly where you need to be.",
      "Today is a good day to be you. Embrace it fully.",
    ],
    other: [
      "Your motivation is a strength. Use it wisely and joyfully.",
      "Whatever sparked this energy, let it carry you forward.",
      "You're in a great place. Savor this moment.",
    ],
  },
  other: {
    work: [
      "Whatever you're feeling, it's okay. You're navigating work the best you can.",
      "Your feelings are complex, and that's human. Give yourself grace.",
      "You bring value to your work, no matter how you're feeling today.",
    ],
    relationships: [
      "Relationships are complex. It's okay to not have it all figured out.",
      "Trust yourself to navigate whatever comes up in your connections.",
      "You're allowed to feel a mix of things. That's what makes you human.",
    ],
    health: [
      "Your body and mind are on a journey. Be patient with the process.",
      "Whatever you're experiencing, you're handling it the best you can.",
      "Listen to what your body and heart are telling you.",
    ],
    future: [
      "The future is unknown, and that's okay. You'll figure it out as you go.",
      "Trust that things will unfold in their own time.",
      "You have the resilience to handle whatever comes next.",
    ],
    general: [
      "It's okay to not know exactly how you feel. You're doing your best.",
      "Your feelings are valid, even when they're hard to name.",
      "Whatever you're going through, you're not alone.",
    ],
    other: [
      "You are enough, just as you are, with all that you're feeling.",
      "Trust yourself. You know more than you think you do.",
      "Whatever this moment holds, you have the strength to meet it.",
    ],
  },
}

export function AffirmationApp() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [selectedContext, setSelectedContext] = useState<Context | null>(null)
  const [customMood, setCustomMood] = useState("")
  const [customContext, setCustomContext] = useState("")
  const [affirmation, setAffirmation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood)
    if (mood !== "other") {
      setCustomMood("")
    }
  }

  const handleContextSelect = (context: Context) => {
    setSelectedContext(context)
    if (context !== "other") {
      setCustomContext("")
    }
  }

  const handleContinueToStep2 = () => {
    if (selectedMood) {
      setStep(2)
    }
  }

const generateAffirmation = async () => {
  setIsLoading(true)
  setStep(3)

  try {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mood:
          selectedMood === "other"
            ? customMood || "unsure"
            : selectedMood,
        context:
          selectedContext === "other"
            ? customContext || "general"
            : selectedContext,
      }),
    })

    const data = await res.json()
    setAffirmation(data.affirmation)
  } catch (err) {
    console.error(err)
    setAffirmation("Something went wrong. Try again.")
  } finally {
    setIsLoading(false)
  }
}

const regenerate = async () => {
  setIsLoading(true)

  try {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mood:
          selectedMood === "other"
            ? customMood || "unsure"
            : selectedMood,
        context:
          selectedContext === "other"
            ? customContext || "general"
            : selectedContext,
      }),
    })

    const data = await res.json()

    setAffirmation(data.affirmation)
  } catch (err) {
    console.error(err)
    setAffirmation("Something went wrong. Try again.")
  } finally {
    setIsLoading(false)
  }
}

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(affirmation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setStep(1)
    setSelectedMood(null)
    setSelectedContext(null)
    setCustomMood("")
    setCustomContext("")
    setAffirmation("")
  }

  const goBack = () => {
    if (step === 2) {
      setStep(1)
      setSelectedContext(null)
      setCustomContext("")
    } else if (step === 3) {
      setStep(2)
      setAffirmation("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="size-4" />
            <span>Personalized Affirmations</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl text-balance">
            A moment of calm,<br />just for you
          </h1>
        </div>

        {/* Progress Indicator */}
        <div className="mb-10 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                s === step ? "w-8 bg-primary" : "w-2 bg-muted"
              )}
            />
          ))}
        </div>

        {/* Step 1: Mood Selection */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 text-center">
              <h2 className="text-xl font-medium text-foreground">
                How are you feeling right now?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Just pick what feels closest — you don't need to be precise
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {moodOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleMoodSelect(option.value)}
                  className={cn(
                    "group rounded-2xl border-2 p-5 text-left transition-all duration-200",
                    "hover:border-primary/50 hover:bg-card hover:shadow-md",
                    selectedMood === option.value
                      ? "border-primary bg-card shadow-md"
                      : "border-transparent bg-secondary/50"
                  )}
                >
                  <div className="font-medium text-foreground">{option.label}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>

            {selectedMood === "other" && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <input
                  type="text"
                  placeholder="Type your mood if not listed..."
                  value={customMood}
                  onChange={(e) => setCustomMood(e.target.value)}
                  className="w-full rounded-xl border-2 border-transparent bg-secondary/50 px-5 py-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleContinueToStep2}
                disabled={!selectedMood}
                size="lg"
                className="rounded-xl px-8"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Context Selection */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={goBack}
              className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>

            <div className="mb-8 text-center">
              <h2 className="text-xl font-medium text-foreground">
                What's been making you feel this way?
              </h2>
              <p className="mt-2 text-muted-foreground">
                You don't have to be precise — just pick what feels closest
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {contextOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleContextSelect(option.value)}
                  className={cn(
                    "rounded-full border-2 px-5 py-2.5 text-sm font-medium transition-all duration-200",
                    "hover:border-primary/50 hover:bg-card",
                    selectedContext === option.value
                      ? "border-primary bg-card text-foreground"
                      : "border-transparent bg-secondary/50 text-muted-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {selectedContext === "other" && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  value={customContext}
                  onChange={(e) => setCustomContext(e.target.value)}
                  className="w-full rounded-xl border-2 border-transparent bg-secondary/50 px-5 py-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
            )}

            <div className="mt-10 flex justify-center">
              <Button
                onClick={generateAffirmation}
                disabled={!selectedContext}
                size="lg"
                className="rounded-xl px-8 gap-2"
              >
                <Sparkles className="size-4" />
                Generate something for me
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Affirmation Result */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {!isLoading && (
              <button
                onClick={goBack}
                className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="size-4" />
                Back
              </button>
            )}

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="mb-6 size-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
                <p className="text-lg text-muted-foreground animate-pulse">
                  Generating something just for you...
                </p>
              </div>
            ) : (
              <>
                <Card className="border-0 bg-card shadow-lg">
                  <CardContent className="p-8 sm:p-10">
                    <p className="text-center text-xl leading-relaxed text-foreground sm:text-2xl font-medium text-balance">
                      "{affirmation}"
                    </p>
                  </CardContent>
                </Card>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Button
                    onClick={regenerate}
                    variant="outline"
                    className="rounded-xl gap-2"
                  >
                    <RefreshCw className="size-4" />
                    Regenerate
                  </Button>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="rounded-xl gap-2"
                  >
                    <Copy className="size-4" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={reset}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                  >
                    Start over with a new mood
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

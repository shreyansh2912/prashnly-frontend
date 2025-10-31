"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, Zap, Shield, BarChart3, MessageSquare, Upload, Sparkles } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">?</span>
            </div>
            <span className="font-bold text-xl">Prashnly</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition">
              Features
            </a>
            <a href="#process" className="text-muted-foreground hover:text-foreground transition">
              How It Works
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition">
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit">
                  <Sparkles className="w-3 h-3 mr-2" />
                  AI-Powered FAQ Assistant
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-balance">
                  Instant Answers to Every Question
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Prashnly uses advanced AI to understand your policies and FAQs, providing instant, accurate answers to
                  customer questions 24/7.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2">
                  Start Free Trial <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
                <div>
                  <p className="text-2xl font-bold">99.9%</p>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">50K+</p>
                  <p className="text-sm text-muted-foreground">Users</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">2M+</p>
                  <p className="text-sm text-muted-foreground">Questions Answered</p>
                </div>
              </div>
            </div>

            {/* Right - Floating Dashboard */}
            <div className="relative h-96 lg:h-full min-h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-3xl" />
              <div className="relative bg-card border border-border rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Dashboard</h3>
                    <Badge variant="success" className="text-xs">
                      Live
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-secondary rounded-lg p-4 space-y-2">
                      <p className="text-sm font-medium">Recent Questions</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MessageSquare className="w-3 h-3" />
                          <span>What is your return policy?</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MessageSquare className="w-3 h-3" />
                          <span>How do I reset my password?</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MessageSquare className="w-3 h-3" />
                          <span>What payment methods do you accept?</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-secondary rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-primary">1,234</p>
                        <p className="text-xs text-muted-foreground">Questions Today</p>
                      </div>
                      <div className="bg-secondary rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-primary">98%</p>
                        <p className="text-xs text-muted-foreground">Satisfaction</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you manage customer support effortlessly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Get answers in milliseconds with our optimized AI engine",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption and compliance with GDPR, SOC 2",
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                description: "Track questions, satisfaction rates, and customer insights",
              },
              {
                icon: Upload,
                title: "Easy Integration",
                description: "Upload PDFs, docs, or connect your knowledge base",
              },
              {
                icon: MessageSquare,
                title: "Multi-Channel",
                description: "Deploy on website, Slack, Discord, and more",
              },
              {
                icon: Sparkles,
                title: "AI Learning",
                description: "Continuously improves with every interaction",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <feature.icon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Process Section */}
      <section id="process" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              How It Works
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Three Simple Steps</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get your AI assistant up and running in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Your Content",
                description: "Add your FAQs, policies, and documentation in any format",
              },
              {
                step: "02",
                title: "Train Your AI",
                description: "Our AI learns from your content and gets smarter over time",
              },
              {
                step: "03",
                title: "Deploy & Monitor",
                description: "Launch on your website and track performance in real-time",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Pricing
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your needs. Always flexible, no hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$29",
                description: "Perfect for small teams",
                features: ["Up to 1,000 questions/month", "Basic analytics", "Email support", "1 knowledge base"],
                highlighted: false,
              },
              {
                name: "Professional",
                price: "$99",
                description: "For growing businesses",
                features: [
                  "Up to 50,000 questions/month",
                  "Advanced analytics",
                  "Priority support",
                  "5 knowledge bases",
                  "Custom branding",
                  "API access",
                ],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large organizations",
                features: [
                  "Unlimited questions",
                  "Custom integrations",
                  "Dedicated support",
                  "SLA guarantee",
                  "Advanced security",
                  "On-premise option",
                ],
                highlighted: false,
              },
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`relative ${
                  plan.highlighted ? "border-primary shadow-lg scale-105" : "border-border"
                } transition-all`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge>Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                    Get Started
                  </Button>
                  <div className="space-y-3">
                    {plan.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-primary/5 border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold">Ready to Transform Your Support?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of companies using Prashnly to deliver instant, accurate customer support
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              Start Your Free Trial <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              Schedule a Demo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">No credit card required. 14-day free trial. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">?</span>
                </div>
                <span className="font-bold">Prashnly</span>
              </div>
              <p className="text-sm text-muted-foreground">AI-powered FAQ & Policy Assistant</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2025 Prashnly. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition">
                Twitter
              </a>
              <a href="#" className="hover:text-foreground transition">
                LinkedIn
              </a>
              <a href="#" className="hover:text-foreground transition">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

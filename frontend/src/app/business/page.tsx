/**
 * Business Tools Page - AI-Powered Startup Assistance
 */
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Lightbulb,
  FileText,
  TrendingUp,
  Target,
  DollarSign,
  Users2,
} from "lucide-react";

export default function BusinessTools() {
  const [activeTab, setActiveTab] = useState("business-plan");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Business Tools</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered tools to accelerate your startup journey
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="business-plan">
            <FileText className="h-4 w-4 mr-2" />
            Business Plan
          </TabsTrigger>
          <TabsTrigger value="pitch-deck">
            <TrendingUp className="h-4 w-4 mr-2" />
            Pitch Deck
          </TabsTrigger>
          <TabsTrigger value="swot">
            <Target className="h-4 w-4 mr-2" />
            SWOT Analysis
          </TabsTrigger>
          <TabsTrigger value="competitor">
            <Users2 className="h-4 w-4 mr-2" />
            Competitors
          </TabsTrigger>
          <TabsTrigger value="funding">
            <DollarSign className="h-4 w-4 mr-2" />
            Funding Strategy
          </TabsTrigger>
          <TabsTrigger value="templates">
            <Lightbulb className="h-4 w-4 mr-2" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="business-plan" className="mt-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              AI Business Plan Generator
            </h2>
            <p className="text-muted-foreground mb-6">
              Create a comprehensive business plan in minutes using AI
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Business Name
                </label>
                <Input placeholder="Enter your business name" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Industry
                </label>
                <select className="w-full p-2 border rounded-md">
                  <option>Technology</option>
                  <option>Healthcare</option>
                  <option>Finance</option>
                  <option>E-commerce</option>
                  <option>SaaS</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Business Description
                </label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  placeholder="Describe your business, what problem it solves, and your target market..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Target Market
                </label>
                <Input placeholder="Who are your target customers?" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Business Model
                </label>
                <Input placeholder="How will you make money?" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Competitive Advantage
                </label>
                <Input placeholder="What makes you different?" />
              </div>

              <Button className="w-full">
                Generate Business Plan
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="pitch-deck" className="mt-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              AI Pitch Deck Creator
            </h2>
            <p className="text-muted-foreground mb-6">
              Create investor-ready pitch deck slides
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Problem Statement
                </label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  placeholder="What problem are you solving?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Solution
                </label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  placeholder="How does your product/service solve this problem?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Market Size
                </label>
                <Input placeholder="e.g., $10B TAM, $2B SAM" />
              </div>

              <Button className="w-full">
                Generate Pitch Deck
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="swot" className="mt-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              SWOT Analysis Generator
            </h2>
            <p className="text-muted-foreground mb-6">
              AI-powered analysis of your Strengths, Weaknesses, Opportunities, and Threats
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Business Context
                </label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  placeholder="Provide context about your business, market, and current situation..."
                />
              </div>

              <Button className="w-full">
                Generate SWOT Analysis
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-green-50">
                <h3 className="font-semibold text-green-700 mb-2">Strengths</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Strong technical team</li>
                  <li>• Innovative product</li>
                </ul>
              </Card>

              <Card className="p-4 bg-red-50">
                <h3 className="font-semibold text-red-700 mb-2">Weaknesses</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Limited marketing budget</li>
                  <li>• Small market reach</li>
                </ul>
              </Card>

              <Card className="p-4 bg-blue-50">
                <h3 className="font-semibold text-blue-700 mb-2">Opportunities</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Growing market demand</li>
                  <li>• International expansion</li>
                </ul>
              </Card>

              <Card className="p-4 bg-orange-50">
                <h3 className="font-semibold text-orange-700 mb-2">Threats</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Increasing competition</li>
                  <li>• Economic downturn</li>
                </ul>
              </Card>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="competitor" className="mt-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Competitor Analysis
            </h2>
            <p className="text-muted-foreground mb-6">
              Understand your competitive landscape
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Industry
                </label>
                <Input placeholder="e.g., SaaS, E-commerce" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Known Competitors (optional)
                </label>
                <Input placeholder="Comma-separated list" />
              </div>

              <Button className="w-full">
                Analyze Competitors
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="funding" className="mt-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Funding Strategy Generator
            </h2>
            <p className="text-muted-foreground mb-6">
              Get personalized funding recommendations
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Current Stage
                </label>
                <select className="w-full p-2 border rounded-md">
                  <option>Idea</option>
                  <option>MVP</option>
                  <option>Early Traction</option>
                  <option>Growth</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Funding Needed
                </label>
                <Input placeholder="e.g., $500K" />
              </div>

              <Button className="w-full">
                Generate Funding Strategy
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-semibold mb-2">Lean Canvas</h3>
              <p className="text-sm text-muted-foreground">
                One-page business model template
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-semibold mb-2">Business Model Canvas</h3>
              <p className="text-sm text-muted-foreground">
                Visual strategic management template
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-semibold mb-2">Financial Projections</h3>
              <p className="text-sm text-muted-foreground">
                3-year financial forecast template
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-semibold mb-2">Go-to-Market Strategy</h3>
              <p className="text-sm text-muted-foreground">
                Product launch and marketing plan
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-semibold mb-2">OKR Template</h3>
              <p className="text-sm text-muted-foreground">
                Objectives and Key Results framework
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-semibold mb-2">Product Roadmap</h3>
              <p className="text-sm text-muted-foreground">
                Strategic product planning template
              </p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

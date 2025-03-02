"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Japanese",
  "Korean",
  "Chinese",
  "Arabic",
  "Hindi",
]

const interestOptions = [
  "Music",
  "Movies",
  "Books",
  "Travel",
  "Food",
  "Sports",
  "Technology",
  "Art",
  "Photography",
  "Gaming",
  "Fitness",
  "Fashion",
  "Nature",
  "Politics",
  "Science",
  "History",
  "Business",
  "Education",
]

interface UserFiltersProps {
  filters: {
    language: string
    interests: string[]
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      language: string
      interests: string[]
    }>
  >
}

export function UserFilters({ filters, setFilters }: UserFiltersProps) {
  const [selectedInterest, setSelectedInterest] = useState("")

  const handleAddInterest = () => {
    if (selectedInterest && !filters.interests.includes(selectedInterest)) {
      setFilters((prev) => ({
        ...prev,
        interests: [...prev.interests, selectedInterest],
      }))
      setSelectedInterest("")
    }
  }

  const handleRemoveInterest = (interest: string) => {
    setFilters((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }))
  }

  const handleClearFilters = () => {
    setFilters({
      language: "",
      interests: [],
    })
    setSelectedInterest("")
  }

  return (
    <div className="w-full md:w-72 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={filters.language}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, language: value }))}
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All languages</SelectItem>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Interests</Label>
            <div className="flex gap-2">
              <Select value={selectedInterest} onValueChange={setSelectedInterest}>
                <SelectTrigger id="interests" className="flex-1">
                  <SelectValue placeholder="Select interest" />
                </SelectTrigger>
                <SelectContent>
                  {interestOptions
                    .filter((interest) => !filters.interests.includes(interest))
                    .map((interest) => (
                      <SelectItem key={interest} value={interest}>
                        {interest}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button type="button" size="sm" onClick={handleAddInterest} disabled={!selectedInterest}>
                Add
              </Button>
            </div>
          </div>

          {filters.interests.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Interests</Label>
              <div className="flex flex-wrap gap-1">
                {filters.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="pl-2 pr-1 py-1">
                    {interest}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1"
                      onClick={() => handleRemoveInterest(interest)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {interest}</span>
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {(filters.language || filters.interests.length > 0) && (
            <Button variant="outline" className="w-full mt-4" onClick={handleClearFilters}>
              Clear all filters
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


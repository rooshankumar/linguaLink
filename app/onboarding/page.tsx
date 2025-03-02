"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
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

export default function Onboarding() {
  const { user, updateUserProfile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [step, setStep] = useState(1)
  const [nativeLanguage, setNativeLanguage] = useState("")
  const [learningLanguage, setLearningLanguage] = useState("")
  const [proficiency, setProficiency] = useState("beginner")
  const [interests, setInterests] = useState<string[]>([])
  const [bio, setBio] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddInterest = (interest: string) => {
    if (!interests.includes(interest)) {
      setInterests([...interests, interest])
    }
  }

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest))
  }

  const handleNext = () => {
    if (step === 1 && (!nativeLanguage || !learningLanguage)) {
      toast({
        title: "Please select languages",
        description: "You need to select both your native and learning languages.",
        variant: "destructive",
      })
      return
    }

    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (!user) return

    setIsLoading(true)

    try {
      await updateUserProfile({
        nativeLanguage,
        learningLanguage,
        interests,
        bio,
      })

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully set up.",
      })

      router.push("/")
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 gradient-bg">
      <Card className="w-full max-w-lg glass-effect">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Set Up Your Profile</CardTitle>
          <CardDescription className="text-center">
            Step {step} of 3: {step === 1 ? "Language Preferences" : step === 2 ? "Your Interests" : "About You"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="native-language">Native Language</Label>
                <Select value={nativeLanguage} onValueChange={setNativeLanguage}>
                  <SelectTrigger id="native-language">
                    <SelectValue placeholder="Select your native language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="learning-language">Language You're Learning</Label>
                <Select value={learningLanguage} onValueChange={setLearningLanguage}>
                  <SelectTrigger id="learning-language">
                    <SelectValue placeholder="Select language you're learning" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages
                      .filter((lang) => lang !== nativeLanguage)
                      .map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Proficiency Level</Label>
                <RadioGroup value={proficiency} onValueChange={setProficiency}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Select Your Interests</Label>
                <p className="text-sm text-muted-foreground">
                  Choose topics you'd like to discuss with language partners
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {interestOptions.map((interest) => (
                    <Button
                      key={interest}
                      type="button"
                      variant={interests.includes(interest) ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => handleAddInterest(interest)}
                    >
                      {interest}
                    </Button>
                  ))}
                </div>
              </div>
              {interests.length > 0 && (
                <div>
                  <Label>Selected Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {interests.map((interest) => (
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
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bio">About You</Label>
                <p className="text-sm text-muted-foreground">
                  Write a short bio to introduce yourself to potential language partners
                </p>
                <Textarea
                  id="bio"
                  placeholder="Hi! I'm learning Spanish to travel through South America next year..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={5}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          {step < 3 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Saving..." : "Complete Setup"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}


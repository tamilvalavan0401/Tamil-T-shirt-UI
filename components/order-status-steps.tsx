"use client"

import { CheckCircle, Package, Truck, Home } from "lucide-react"

interface OrderStep {
  id: number
  title: string
  description?: string
  date?: string
  completed: boolean
  current?: boolean
}

interface OrderStatusStepsProps {
  steps: OrderStep[]
  layout?: "vertical" | "horizontal"
}

export function OrderStatusSteps({ steps, layout = "vertical" }: OrderStatusStepsProps) {
  const getStepIcon = (step: OrderStep) => {
    if (step.completed) {
      return <CheckCircle className="w-5 h-5" />
    }

    switch (step.id) {
      case 1:
        return <Package className="w-5 h-5" />
      case 2:
        return <Truck className="w-5 h-5" />
      case 3:
        return <Home className="w-5 h-5" />
      default:
        return <span className="text-sm font-semibold">{step.id}</span>
    }
  }

  if (layout === "horizontal") {
    const completedSteps = steps.filter((step) => step.completed).length
    const progressPercentage = completedSteps > 0 ? ((completedSteps - 1) / (steps.length - 1)) * 100 : 0

    return (
      <div className="w-full max-w-4xl mx-auto py-8 px-4 bg-white">
        <h2 className="text-2xl font-bold text-center mb-2">Order Confirmation</h2>
        <p className="text-gray-600 text-center mb-12">Thank you for your order!</p>

        <div className="relative px-8">
          {/* Background Progress Line */}
          <div className="absolute top-6 left-8 right-8 h-1 bg-white rounded-full">
            {/* Active Progress Line */}
            <div
              className="h-full bg-primary rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Steps Container */}
          <div className="relative flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center z-10">
                {/* Step Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-4 ${
                    step.completed
                      ? "bg-primary text-white border-white"
                      : step.current
                        ? "bg-white text-primary border-white"
                        : "bg-white text-gray-400 border-gray-200"
                  }`}
                >
                  {getStepIcon(step)}
                </div>

                {/* Step Label */}
                <div className="mt-4 text-center">
                  <span
                    className={`text-sm font-medium block ${
                      step.completed || step.current ? "text-primary" : "text-gray_text"
                    }`}
                  >
                    {step.title}
                  </span>
                  {step.date && <span className="text-xs text-gray-400 mt-1 block">{step.date}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Vertical Layout (Mobile/Default)
  return (
    <div className="w-full max-w-2xl mx-auto py-6 px-4">
      <h2 className="text-xl font-bold mb-8 text-center">Order Status</h2>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-4">
            {/* Step Circle with connecting line */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-4 ${
                  step.completed
                    ? "bg-primary text-white border-white"
                    : step.current
                      ? "bg-white text-primary border-white"
                      : "bg-white text-gray-400 border-gray-200"
                }`}
              >
                {getStepIcon(step)}
              </div>

              {/* Connecting Line - Only show if not the last step */}
              {index < steps.length - 1 && (
                <div
                  className={`w-1 h-16 mt-2 rounded-full transition-all duration-300 ${
                    step.completed ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 pb-8">
              <h3
                className={`font-semibold text-lg mb-1 ${
                  step.completed || step.current ? "text-primary" : "text-gray_text"
                }`}
              >
                {step.title}
              </h3>
              {step.description && <p className="text-gray-600 text-sm mb-2">{step.description}</p>}
              {step.date && <p className="text-gray_text text-xs">{step.date}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_COURSES, Course, DATA_VERSION } from '@/lib/mock-data';

interface ProgressContextType {
  courses: Course[];
  completeLesson: (courseSlug: string, lessonDay: number) => void;
  resetProgress: () => void;
  isLoaded: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedVersion = localStorage.getItem('devjourney_version');
    const stored = localStorage.getItem('devjourney_courses');

    if (stored && storedVersion === String(DATA_VERSION)) {
      try {
        setCourses(JSON.parse(stored));
      } catch (e) {
        setCourses(MOCK_COURSES);
      }
    } else {
      // Version mismatch or first load — reset to latest data
      localStorage.setItem('devjourney_version', String(DATA_VERSION));
      localStorage.setItem('devjourney_courses', JSON.stringify(MOCK_COURSES));
      setCourses(MOCK_COURSES);
    }
    setIsLoaded(true);
  }, []);

  const completeLesson = (courseSlug: string, lessonDay: number) => {
    setCourses(prevCourses => {
      const updated = prevCourses.map(course => {
        if (course.slug !== courseSlug) return course;

        const updatedLessons = course.lessons.map(lesson => {
          if (lesson.day === lessonDay) {
            return { ...lesson, isCompleted: true };
          }
          // Unlock the next lesson (day + 1)
          if (lesson.day === lessonDay + 1) {
            return { ...lesson, isUnlocked: true };
          }
          return lesson;
        });

        return { ...course, lessons: updatedLessons };
      });

      localStorage.setItem('devjourney_courses', JSON.stringify(updated));
      return updated;
    });
  };

  const resetProgress = () => {
    localStorage.setItem('devjourney_courses', JSON.stringify(MOCK_COURSES));
    setCourses(MOCK_COURSES);
  };

  return (
    <ProgressContext.Provider value={{ courses, completeLesson, resetProgress, isLoaded }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

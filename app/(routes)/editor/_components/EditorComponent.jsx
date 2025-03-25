import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2, X, ArrowUp, ArrowDown } from "lucide-react";
import { initialSections } from "../utils";

const EditorComponent = ({ onSave }) => {
  const [sections, setSections] = useState(initialSections);

  // Handle input changes for personal info
  const handlePersonalInfoChange = (sectionId, fieldId, value) => {
    setSections((prevSections) => {
      return prevSections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: section.fields.map((field) => {
              if (field.id === fieldId) {
                return { ...field, value };
              }
              return field;
            }),
          };
        }
        return section;
      });
    });
  };

  // Handle input changes for items in arrays (education, experience, skills)
  const handleItemChange = (sectionId, itemId, field, value) => {
    setSections((prevSections) => {
      return prevSections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            items: section.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, [field]: value };
              }
              return item;
            }),
          };
        }
        return section;
      });
    });
  };

  // Add new item to a section
  const addItem = (sectionId, type) => {
    setSections((prevSections) => {
      return prevSections.map((section) => {
        if (section.id === sectionId) {
          const newItemId = `${type}-${section.items.length + 1}`;
          let newItem;

          switch (type) {
            case "edu":
              newItem = {
                id: newItemId,
                institution: "",
                degree: "",
                fieldOfStudy: "",
                startDate: "",
                endDate: "",
                description: "",
              };
              break;
            case "exp":
              newItem = {
                id: newItemId,
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                description: "",
              };
              break;
            case "skill":
              newItem = { id: newItemId, name: "", level: "" };
              break;
            default:
              newItem = { id: newItemId, title: "", description: "" };
          }

          return {
            ...section,
            items: [...section.items, newItem],
          };
        }
        return section;
      });
    });
  };

  // Remove an item from a section
  const removeItem = (sectionId, itemId) => {
    setSections((prevSections) => {
      return prevSections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            items: section.items.filter((item) => item.id !== itemId),
          };
        }
        return section;
      });
    });
  };

  // Move an item up within a section
  const moveItemUp = (sectionId, itemIndex) => {
    if (itemIndex === 0) return; // Already at the top

    setSections((prevSections) => {
      return prevSections.map((section) => {
        if (section.id === sectionId) {
          const newItems = [...section.items];
          const temp = newItems[itemIndex];
          newItems[itemIndex] = newItems[itemIndex - 1];
          newItems[itemIndex - 1] = temp;

          return {
            ...section,
            items: newItems,
          };
        }
        return section;
      });
    });
  };

  // Move an item down within a section
  const moveItemDown = (sectionId, itemIndex) => {
    setSections((prevSections) => {
      const section = prevSections.find((s) => s.id === sectionId);
      if (itemIndex === section.items.length - 1) return prevSections; // Already at the bottom

      return prevSections.map((section) => {
        if (section.id === sectionId) {
          const newItems = [...section.items];
          const temp = newItems[itemIndex];
          newItems[itemIndex] = newItems[itemIndex + 1];
          newItems[itemIndex + 1] = temp;

          return {
            ...section,
            items: newItems,
          };
        }
        return section;
      });
    });
  };

  // Move a section up
  const moveSectionUp = (index) => {
    if (index === 0) return; // Already at the top

    setSections((prevSections) => {
      const newSections = [...prevSections];
      const temp = newSections[index];
      newSections[index] = newSections[index - 1];
      newSections[index - 1] = temp;
      return newSections;
    });
  };

  // Move a section down
  const moveSectionDown = (index) => {
    if (index === sections.length - 1) return; // Already at the bottom

    setSections((prevSections) => {
      const newSections = [...prevSections];
      const temp = newSections[index];
      newSections[index] = newSections[index + 1];
      newSections[index + 1] = temp;
      return newSections;
    });
  };

  // Add a new custom section
  const addCustomSection = () => {
    const newSectionId = `custom-${Date.now()}`;
    setSections([
      ...sections,
      {
        id: newSectionId,
        title: "Custom Section",
        type: "custom",
        items: [
          { id: `custom-item-1-${Date.now()}`, title: "", description: "" },
        ],
      },
    ]);
  };

  // Remove a section
  const removeSection = (sectionId) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data
    console.log("Form Data:", sections);
    onSave(sections);
    // Here you would typically send the data to a server or process it further
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <Card key={section.id} className="border shadow-sm">
              <CardHeader className="bg-muted flex flex-row items-center justify-between">
                <CardTitle className="text-lg">{section.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveSectionUp(index)}
                    disabled={index === 0}
                    type="button"
                  >
                    <ArrowUp size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveSectionDown(index)}
                    disabled={index === sections.length - 1}
                    type="button"
                  >
                    <ArrowDown size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSection(section.id)}
                    className="text-red-500 hover:text-red-700"
                    type="button"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {section.type === "personal" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.fields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <Input
                          id={field.id}
                          type={field.type}
                          value={field.value}
                          onChange={(e) =>
                            handlePersonalInfoChange(
                              section.id,
                              field.id,
                              e.target.value
                            )
                          }
                          placeholder={field.label}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "summary" && (
                  <div className="space-y-2">
                    <Label htmlFor="summary">{section.title}</Label>
                    <Textarea
                      id={section.id}
                      value={section.value}
                      placeholder={section.title}
                      onChange={(e) =>
                        setSections((prevSections) => {
                          return prevSections.map((s) => {
                            if (s.id === section.id) {
                              return { ...s, value: e.target.value };
                            }
                            return s;
                          });
                        })
                      }
                    />
                  </div>
                )}

                {section.type === "education" && (
                  <div className="space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={item.id}
                        className="relative border border-gray-200 rounded-md p-4"
                      >
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveItemUp(section.id, itemIndex)}
                            disabled={itemIndex === 0}
                            type="button"
                          >
                            <ArrowUp size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveItemDown(section.id, itemIndex)}
                            disabled={itemIndex === section.items.length - 1}
                            type="button"
                          >
                            <ArrowDown size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeItem(section.id, item.id)}
                            disabled={section.items.length === 1}
                            type="button"
                          >
                            <X size={16} />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          <div className="space-y-2">
                            <Label htmlFor={`${item.id}-institution`}>
                              Institution
                            </Label>
                            <Input
                              id={`${item.id}-institution`}
                              value={item.institution}
                              onChange={(e) =>
                                handleItemChange(
                                  section.id,
                                  item.id,
                                  "institution",
                                  e.target.value
                                )
                              }
                              placeholder="Institution"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`${item.id}-degree`}>Degree</Label>
                            <Input
                              id={`${item.id}-degree`}
                              value={item.degree}
                              onChange={(e) =>
                                handleItemChange(
                                  section.id,
                                  item.id,
                                  "degree",
                                  e.target.value
                                )
                              }
                              placeholder="Degree"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`${item.id}-field`}>
                              Field of Study
                            </Label>
                            <Input
                              id={`${item.id}-field`}
                              value={item.fieldOfStudy}
                              onChange={(e) =>
                                handleItemChange(
                                  section.id,
                                  item.id,
                                  "fieldOfStudy",
                                  e.target.value
                                )
                              }
                              placeholder="Field of Study"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <Label htmlFor={`${item.id}-start`}>
                                Start Date
                              </Label>
                              <Input
                                id={`${item.id}-start`}
                                type="date"
                                value={item.startDate}
                                onChange={(e) =>
                                  handleItemChange(
                                    section.id,
                                    item.id,
                                    "startDate",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`${item.id}-end`}>End Date</Label>
                              <Input
                                id={`${item.id}-end`}
                                type="date"
                                value={item.endDate}
                                onChange={(e) =>
                                  handleItemChange(
                                    section.id,
                                    item.id,
                                    "endDate",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor={`${item.id}-description`}>
                              Description
                            </Label>
                            <Textarea
                              id={`${item.id}-description`}
                              value={item.description}
                              onChange={(e) =>
                                handleItemChange(
                                  section.id,
                                  item.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Description"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addItem(section.id, "edu")}
                      className="w-full mt-2"
                    >
                      <PlusCircle size={16} className="mr-2" />
                      Add Education
                    </Button>
                  </div>
                )}

                {section.type === "experience" && (
                  <div className="space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={item.id}
                        className="relative border border-gray-200 rounded-md p-4"
                      >
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveItemUp(section.id, itemIndex)}
                            disabled={itemIndex === 0}
                            type="button"
                          >
                            <ArrowUp size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveItemDown(section.id, itemIndex)}
                            disabled={itemIndex === section.items.length - 1}
                            type="button"
                          >
                            <ArrowDown size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeItem(section.id, item.id)}
                            disabled={section.items.length === 1}
                            type="button"
                          >
                            <X size={16} />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          <div className="space-y-2">
                            <Label htmlFor={`${item.id}-company`}>
                              Company
                            </Label>
                            <Input
                              id={`${item.id}-company`}
                              value={item.company}
                              onChange={(e) =>
                                handleItemChange(
                                  section.id,
                                  item.id,
                                  "company",
                                  e.target.value
                                )
                              }
                              placeholder="Company"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`${item.id}-position`}>
                              Position
                            </Label>
                            <Input
                              id={`${item.id}-position`}
                              value={item.position}
                              onChange={(e) =>
                                handleItemChange(
                                  section.id,
                                  item.id,
                                  "position",
                                  e.target.value
                                )
                              }
                              placeholder="Position"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <Label htmlFor={`${item.id}-start`}>
                                Start Date
                              </Label>
                              <Input
                                id={`${item.id}-start`}
                                type="date"
                                value={item.startDate}
                                onChange={(e) =>
                                  handleItemChange(
                                    section.id,
                                    item.id,
                                    "startDate",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`${item.id}-end`}>End Date</Label>
                              <Input
                                id={`${item.id}-end`}
                                type="date"
                                value={item.endDate}
                                onChange={(e) =>
                                  handleItemChange(
                                    section.id,
                                    item.id,
                                    "endDate",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor={`${item.id}-description`}>
                              Description
                            </Label>
                            <Textarea
                              id={`${item.id}-description`}
                              value={item.description}
                              onChange={(e) =>
                                handleItemChange(
                                  section.id,
                                  item.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Description"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addItem(section.id, "exp")}
                      className="w-full mt-2"
                    >
                      <PlusCircle size={16} className="mr-2" />
                      Add Experience
                    </Button>
                  </div>
                )}

                {section.type === "skills" && (
                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveItemUp(section.id, itemIndex)}
                          disabled={itemIndex === 0}
                          type="button"
                        >
                          <ArrowUp size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveItemDown(section.id, itemIndex)}
                          disabled={itemIndex === section.items.length - 1}
                          type="button"
                        >
                          <ArrowDown size={16} />
                        </Button>
                        <div className="flex-grow">
                          <Input
                            value={item.name}
                            onChange={(e) =>
                              handleItemChange(
                                section.id,
                                item.id,
                                "name",
                                e.target.value
                              )
                            }
                            placeholder="Skill name"
                          />
                        </div>
                        <div className="flex-grow">
                          <Input
                            value={item.level}
                            onChange={(e) =>
                              handleItemChange(
                                section.id,
                                item.id,
                                "level",
                                e.target.value
                              )
                            }
                            placeholder="Skill level (e.g., Expert, Intermediate)"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(section.id, item.id)}
                          disabled={section.items.length === 1}
                          className="text-red-500 hover:text-red-700"
                          type="button"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addItem(section.id, "skill")}
                      className="w-full mt-2"
                    >
                      <PlusCircle size={16} className="mr-2" />
                      Add Skill
                    </Button>
                  </div>
                )}

                {section.type === "custom" && (
                  <div className="space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={item.id}
                        className="relative border border-gray-200 rounded-md p-4"
                      >
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveItemUp(section.id, itemIndex)}
                            disabled={itemIndex === 0}
                            type="button"
                          >
                            <ArrowUp size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveItemDown(section.id, itemIndex)}
                            disabled={itemIndex === section.items.length - 1}
                            type="button"
                          >
                            <ArrowDown size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeItem(section.id, item.id)}
                            disabled={section.items.length === 1}
                            type="button"
                          >
                            <X size={16} />
                          </Button>
                        </div>
                        <div className="space-y-4 mt-6">
                          <div className="space-y-2">
                            <Label htmlFor={`${item.id}-title`}>Title</Label>
                            <Input
                              id={`${item.id}-title`}
                              value={item.title}
                              onChange={(e) =>
                                handleItemChange(
                                  section.id,
                                  item.id,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="Title"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`${item.id}-description`}>
                              Description
                            </Label>
                            <Textarea
                              id={`${item.id}-description`}
                              value={item.description}
                              onChange={(e) =>
                                handleItemChange(
                                  section.id,
                                  item.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Description"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addItem(section.id, "custom")}
                      className="w-full mt-2"
                    >
                      <PlusCircle size={16} className="mr-2" />
                      Add Item
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <Button
            type="button"
            variant="outline"
            onClick={addCustomSection}
            className="w-full"
          >
            <PlusCircle size={16} className="mr-2" />
            Add Custom Section
          </Button>

          <Button type="submit" className="w-full">
            Save CV
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditorComponent;

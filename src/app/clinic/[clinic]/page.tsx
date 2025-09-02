import clinics from "@/data/clinics.json";
import cRatings from "@/data/clinicRatings.json";
import cSummaries from "@/data/clinicSummary.json";
import { Clinic, ClinicRating, ClinicSummary } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Globe, MapPin, Phone, Star } from "lucide-react";
import ClinicStarRating from "@/components/ClinicStarRating";

export default async function Page({
  params,
}: {
  params: Promise<{ clinic: string }>;
}) {
  const { clinic } = await params;
  let cRating: ClinicRating | undefined;
  let cSummary: ClinicSummary | undefined;
  const clinicDeets = clinics.find((c: Clinic) => {
    return c.id === Number(clinic);
  });

  if (clinicDeets) {
    cRating = cRatings.find(
      (rating: ClinicRating) => rating.clinicId === Number(clinic)
    );
    cSummary = cSummaries.find(
      (summary: ClinicSummary) => summary.id === Number(clinic)
    );
  }
  return (
    <>
      {clinicDeets ? (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          {/* Header Card */}
          <Card className="border-2 pb-5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-blue-900">
                    {clinicDeets.name}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        Est. {cSummary?.foundedYear}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">
                        {cRating?.overallRating}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {cSummary?.services.map((service, index) => (
                      <Badge
                        variant={"secondary"}
                        key={index}
                        className="text-xs"
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Medical Center
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {cSummary?.summary}
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader className=" pb-2">
                <CardTitle className="text-xl flex items-center gap-1">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-1 text-gray-500" />
                  <div>
                    <div className="font-medium">
                      {clinicDeets.address.street}
                    </div>
                    <div className="text-sm text-gray-600">
                      {clinicDeets.address.city}, {clinicDeets.address.state}{" "}
                      {clinicDeets.address.zipCode}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{clinicDeets.phone}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <a
                    href={clinicDeets.website}
                    className="text-blue-600 hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {clinicDeets.website}
                  </a>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Accepted Insurance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {clinicDeets.acceptedInsurance.map((insurance, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">{insurance}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Ratings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex text-xl items-center gap-2">
                  <Star className="h-5 w-5" />
                  Patient Ratings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ClinicStarRating rating={cRating?.staff ?? 0} label="Staff" />
                <ClinicStarRating
                  rating={cRating?.patientCareSatisfaction ?? 0}
                  label="Patient Care"
                />
                <ClinicStarRating
                  rating={cRating?.waitTimes ?? 0}
                  label="Wait Times"
                />
                <ClinicStarRating
                  rating={cRating?.affordability ?? 0}
                  label="Affordability"
                />
                <ClinicStarRating
                  rating={cRating?.atmosphere ?? 0}
                  label="Atmosphere"
                />
              </CardContent>
            </Card>
          </div>

          {/* Insurance */}
        </div>
      ) : (
        <div>Clinic Not Found</div>
      )}
    </>
  );
}

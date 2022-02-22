import _ from "lodash";
import { Children, FC, SVGProps } from "react";
import {
  AcademicCapIcon,
  AnnotationIcon,
  BanIcon,
  CursorClickIcon,
  DeviceMobileIcon,
  FilterIcon,
  GlobeAltIcon,
  IdentificationIcon,
  MoonIcon,
  SearchIcon,
  TemplateIcon,
  ThumbUpIcon,
} from "@heroicons/react/outline";

interface IFeatures {
    title: string;
    subtitle: string;
    icon: FC<SVGProps<SVGSVGElement>>;
    offers: {
        title: string;
        icon: FC<SVGProps<SVGSVGElement>>;
    }[]
}

const features: IFeatures[] = [
  {
    title: "Nuestra pagina",
    subtitle: "Escogimos crear esta pagina para ofrecer a los usuarios lo mejor.",
    icon: GlobeAltIcon,
    offers: [
      { title: "Diseño simple", icon: TemplateIcon },
      { title: "Modo nocturno", icon: MoonIcon },
      { title: "Diseño responsivo", icon: DeviceMobileIcon },
    ],
  },
  {
    title: "Profesores",
    subtitle: "La manera mas facil de buscar al profesor que seleccionaste.",
    icon: AcademicCapIcon,
    offers: [
      { title: "Motor de busqueda", icon: SearchIcon },
      { title: "Filtro", icon: FilterIcon },
      { title: "Comentarios", icon: AnnotationIcon },
      { title: "Votos", icon: ThumbUpIcon },
    ],
  },
  {
    title: "Autenticacion",
    subtitle: "Los formularios de registros son tan... largos, por eso te ofrecemos una mejor manera.",
    icon: IdentificationIcon,
    offers: [
      { title: "Con un solo click inicias sesion", icon: CursorClickIcon },
      { title: "Sin formularios", icon: BanIcon },
    ],
  },
];

const Features = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="flex flex-col mb-6 lg:flex-row md:mb-10">
        <div className="lg:w-1/2">
          <h2 className="max-w-md mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-none xl:max-w-lg">
            Para ser los mejores debemos ofrecer mejores cosas.
          </h2>
        </div>
        <div className="lg:w-1/2">
          <p className="text-base text-gray-700 dark:text-gray-300 md:text-lg">
            Tenemos algunas características que nos diferencian de
            otros reviewers y que debes conocer.
          </p>
        </div>
      </div>
      <section className="grid gap-8 row-gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {Children.toArray(features.map(({
          title, subtitle, icon: Icon, offers,
        }) => (
          <div>
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-default-color">
              <Icon className="w-8 h-8 text-gray-100" />
            </div>
            <h6 className="mb-2 font-semibold leading-5 text-gray-900 dark:text-gray-100">{title}</h6>
            <p className="mb-3 text-sm text-gray-900 dark:text-gray-300">
              {subtitle}
            </p>
            <ul className="mb-4 -ml-1 space-y-2">
              {_.map(offers, (offer) => (
                <li className="flex items-center gap-1" key={offer?.title}>
                  <offer.icon className="w-6 h-6 mt-px text-default-color" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{offer?.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )))}
      </section>
    </div>
  );
};

export default Features;

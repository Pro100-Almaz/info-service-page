"use client";

import { Timeline } from "@/components/ui/timeline";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Tags({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-5">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2 border border-white/[0.08] bg-white/[0.03] px-3 py-2.5"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
          <span className="text-white/50 text-base">{item}</span>
        </div>
      ))}
    </div>
  );
}

function Result({ text }: { text: string }) {
  return (
    <div className="border border-white/[0.06] bg-white/[0.02] px-4 py-3 mt-2">
      <p className="text-white/30 text-base leading-relaxed">{text}</p>
    </div>
  );
}

// ─── Process data ─────────────────────────────────────────────────────────────

const processData = [
  {
    title: "Созвон",
    content: (
      <div>
        <p className="text-white/60 text-base mb-5 leading-relaxed">
          Разбираемся в задаче — вопросы о вашем бизнесе, не о нас.
          После звонка пришлём письменное резюме: как поняли и что дальше.
        </p>
        <Tags
          items={[
            "Созвон в удобное время",
            "Вопросы о вашем бизнесе",
            "Показ похожих кейсов",
            "Резюме звонка в тот же день",
          ]}
        />
        <Result text="Всё зафиксировано письменно — никаких домыслов" />
      </div>
    ),
  },
  {
    title: "Бриф и оценка",
    content: (
      <div>
        <p className="text-white/60 text-base mb-5 leading-relaxed">
          Заполняете короткий бриф — 15 минут. Называем предварительную
          вилку стоимости в тот же день, до полного предложения.
        </p>
        <Tags
          items={[
            "Бриф по задаче",
            "Уточнение требований и сроков",
            "Предварительная стоимость в день брифа",
          ]}
        />
        <Result text="Понимаете бюджет до того, как тратить время на детали" />
      </div>
    ),
  },
  {
    title: "Предложение",
    content: (
      <div>
        <p className="text-white/60 text-base mb-5 leading-relaxed">
          PDF с решением, этапами, стоимостью и графиком работ по неделям.
          Потом короткий созвон — объясняем логику и отвечаем на вопросы.
        </p>
        <Tags
          items={[
            "Описание решения",
            "Этапы с промежуточными результатами",
            "График работ по неделям",
            "Стоимость с разбивкой",
            "Условия правок и поддержки",
          ]}
        />
        <Result text="Что, как и за сколько — без размытых формулировок" />
      </div>
    ),
  },
  {
    title: "Договор и старт",
    content: (
      <div>
        <p className="text-white/60 text-base mb-5 leading-relaxed">
          Ключевые пункты договора объясняем простым языком до подписания.
          Знакомитесь с командой и получаете доступ к статусам проекта онлайн.
        </p>
        <Tags
          items={[
            "Договор на понятном языке",
            "Поэтапная схема оплаты",
            "Знакомство с командой",
            "Доступ к статусам проекта онлайн",
          ]}
        />
        <Result text="Знаете кто работает и что происходит — в реальном времени" />
      </div>
    ),
  },
  {
    title: "Разработка",
    content: (
      <div>
        <p className="text-white/60 text-base mb-5 leading-relaxed">
          Работаем поэтапно, принимаете каждый этап до перехода к следующему.
          Каждую пятницу — короткий отчёт. Изменения фиксируем письменно сразу.
        </p>
        <Tags
          items={[
            "Демо после каждого этапа",
            "Отчёт каждую пятницу",
            "Один менеджер весь проект",
            "Изменения — только письменно",
          ]}
        />
        <Result text="Правки вносите до того, как всё готово — не после" />
      </div>
    ),
  },
  {
    title: "Сдача",
    content: (
      <div>
        <p className="text-white/60 text-base mb-5 leading-relaxed">
          Финальный показ, доступы, документация и видео-инструкция для
          команды. Три месяца поддержки включены в стоимость.
        </p>
        <Tags
          items={[
            "Передача доступов и документации",
            "Видео-инструкция для команды",
            "3 месяца поддержки включены",
            "Независимость от нас в будущем",
          ]}
        />
        <Result text="Продукт + всё необходимое, чтобы с ним работать без нас" />
      </div>
    ),
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function Process() {
  return (
    <section id="process" className="relative">
      <Timeline data={processData} />
    </section>
  );
}

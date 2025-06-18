export interface CompetitionProduct {
    id: number;
    title: string;
    permalink: string;
    image: string;
    type: string;
    is_on_sale: boolean;
    sale_price: string;
    regular_price: string;
    max_tickets: number;
    tickets_sold: number;
    tickets_left: number;
    percentage_left: number;
    draw_date_tag: string;
    additional_info: {
        text: string;
        class: string;
    };
    disable_ticket_sales: "0" | "1"; // as string
    end_date: number; // UNIX timestamp (seconds)
    start_date: number; // UNIX timestamp (seconds)
    order: number;
}

export interface CompetitionSection {
    title: string;
    class: string;
    products: CompetitionProduct[];
}

export interface CompetitionSections {
    [key: string]: {
        title: string;
        sectionHeading?: string;
        class?: string;
        products: CompetitionProduct[];
    };
}

package com.jcarroll95.apptrack.controller;

import com.jcarroll95.apptrack.model.Contact;
import com.jcarroll95.apptrack.repository.ContactRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @GetMapping
    public List<Contact> getAll() {
        return contactRepository.findAll();
    }

    @PostMapping
    public Contact create(@RequestBody Contact contact) {
        return contactRepository.save(contact);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> getById(@PathVariable Long id) {
        return contactRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<Contact> update(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {

        return contactRepository.findById(id).map(c -> {
            if (body.containsKey("name") && body.get("name") != null)
                c.setName((String) body.get("name"));
            if (body.containsKey("company"))
                c.setCompany(body.get("company") != null ? (String) body.get("company") : null);
            if (body.containsKey("email"))
                c.setEmail(body.get("email") != null ? (String) body.get("email") : null);
            if (body.containsKey("phone"))
                c.setPhone(body.get("phone") != null ? (String) body.get("phone") : null);
            if (body.containsKey("notes"))
                c.setNotes(body.get("notes") != null ? (String) body.get("notes") : null);
            if (body.containsKey("deleted"))
                c.setDeleted((Boolean) body.get("deleted"));
            return ResponseEntity.ok(contactRepository.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }
}